import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import products, { type Product } from '@/data/products'
import { shippingFor, type Fulfillment } from '@/data/store'

interface CartItem {
  productId: string
  quantity: number
}

interface CartLine {
  product: Product
  quantity: number
}

interface CartContextValue {
  items: Array<CartItem>
  lines: Array<CartLine>
  count: number
  subtotalCents: number
  shippingCents: number
  totalCents: number
  fulfillment: Fulfillment
  setFulfillment: (fulfillment: Fulfillment) => void
  add: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const STORAGE_KEY = 'fitzgerald-cart'
const FULFILLMENT_KEY = 'fitzgerald-fulfillment'
const MAX_QTY = 20

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Array<CartItem>>([])
  const [fulfillment, setFulfillment] = useState<Fulfillment>('ship')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (Array.isArray(saved)) {
        setItems(
          saved.filter(
            (i): i is CartItem =>
              typeof i?.productId === 'string' &&
              typeof i?.quantity === 'number' &&
              products.some((p) => p.id === i.productId),
          ),
        )
      }
    } catch {
      // ignore malformed storage
    }
    if (localStorage.getItem(FULFILLMENT_KEY) === 'pickup') setFulfillment('pickup')
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  useEffect(() => {
    if (hydrated) localStorage.setItem(FULFILLMENT_KEY, fulfillment)
  }, [fulfillment, hydrated])

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((item) => {
      const product = products.find((p) => p.id === item.productId)
      return product ? [{ product, quantity: item.quantity }] : []
    })
    const subtotalCents = lines.reduce(
      (sum, l) => sum + l.product.priceCents * l.quantity,
      0,
    )
    const shippingCents = shippingFor(subtotalCents, fulfillment)
    const clamp = (q: number) => Math.max(1, Math.min(MAX_QTY, Math.round(q)))

    return {
      items,
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotalCents,
      shippingCents,
      totalCents: subtotalCents + shippingCents,
      fulfillment,
      setFulfillment,
      add: (productId, quantity = 1) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === productId)
          if (existing) {
            return prev.map((i) =>
              i.productId === productId
                ? { ...i, quantity: clamp(i.quantity + quantity) }
                : i,
            )
          }
          return [...prev, { productId, quantity: clamp(quantity) }]
        }),
      setQuantity: (productId, quantity) =>
        setItems((prev) =>
          prev.map((i) =>
            i.productId === productId ? { ...i, quantity: clamp(quantity) } : i,
          ),
        ),
      remove: (productId) =>
        setItems((prev) => prev.filter((i) => i.productId !== productId)),
      clear: () => setItems([]),
    }
  }, [items, fulfillment])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
