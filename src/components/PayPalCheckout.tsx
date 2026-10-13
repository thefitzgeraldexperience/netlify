import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  capturePaypalOrder,
  createPaypalOrder,
  getPaypalConfig,
} from '@/lib/checkout'
import { useCart } from '@/lib/cart'

interface PayPalButtonsInstance {
  render: (el: HTMLElement) => Promise<void>
  close?: () => Promise<void>
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => PayPalButtonsInstance
    }
  }
}

let sdkPromise: Promise<void> | null = null

function loadSdk(clientId: string, currency: string) {
  if (window.paypal) return Promise.resolve()
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${currency}&intent=capture&components=buttons`
      script.onload = () => resolve()
      script.onerror = () => {
        sdkPromise = null
        reject(new Error('Could not load PayPal'))
      }
      document.head.appendChild(script)
    })
  }
  return sdkPromise
}

type Status = 'loading' | 'ready' | 'disabled' | 'error'

export function PayPalCheckout() {
  const { items, clear } = useCart()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef(items)
  itemsRef.current = items
  const clearRef = useRef(clear)
  clearRef.current = clear
  const [status, setStatus] = useState<Status>('loading')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    let buttons: PayPalButtonsInstance | null = null

    getPaypalConfig()
      .then(async (config) => {
        if (!config.enabled) {
          if (!cancelled) setStatus('disabled')
          return
        }
        await loadSdk(config.clientId, config.currency)
        if (cancelled || !containerRef.current || !window.paypal) return

        buttons = window.paypal.Buttons({
          style: { layout: 'vertical', shape: 'pill', color: 'gold', label: 'pay' },
          createOrder: () =>
            createPaypalOrder({ data: itemsRef.current }),
          onApprove: async (data: { orderID: string }) => {
            setMessage(null)
            await capturePaypalOrder({ data: data.orderID })
            clearRef.current()
            navigate({ to: '/checkout/success', search: { order: data.orderID } })
          },
          onCancel: () => setMessage('Payment cancelled — your cart is still here.'),
          onError: (err: unknown) => {
            console.error('PayPal error', err)
            setMessage('Something went wrong with PayPal. Please try again.')
          },
        })
        containerRef.current.innerHTML = ''
        await buttons.render(containerRef.current)
        if (!cancelled) setStatus('ready')
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      buttons?.close?.().catch(() => {})
    }
  }, [navigate])

  if (status === 'disabled') {
    return (
      <div className="rounded-2xl border border-ember/30 bg-ember/10 p-4 text-sm text-cream">
        Online checkout is opening soon. Check back shortly!
      </div>
    )
  }

  return (
    <div>
      {status === 'loading' && (
        <div className="h-[110px] animate-pulse rounded-2xl bg-cream/10" />
      )}
      {status === 'error' && (
        <p className="text-sm text-red-300">
          PayPal couldn't load. Please refresh the page and try again.
        </p>
      )}
      <div ref={containerRef} className="rounded-2xl bg-cream p-3 empty:hidden" />
      {message && <p className="mt-3 text-sm text-ash">{message}</p>}
    </div>
  )
}
