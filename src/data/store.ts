export const STORE_NAME = 'The Fitzgerald Experience'
export const STORE_TAGLINE = 'Small-batch smoked salts & body balms'
export const CURRENCY = 'USD'

// Shipping rules — adjust to match how you ship.
export const SHIPPING_FLAT_CENTS = 600
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000

export function shippingFor(subtotalCents: number) {
  if (subtotalCents === 0) return 0
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FLAT_CENTS
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: CURRENCY,
  }).format(cents / 100)
}

export function imageUrl(src: string, width: number, height?: number) {
  const params = new URLSearchParams({ url: src, w: String(width), fm: 'webp' })
  if (height) {
    params.set('h', String(height))
    params.set('fit', 'contain')
  }
  return `/.netlify/images?${params.toString()}`
}
