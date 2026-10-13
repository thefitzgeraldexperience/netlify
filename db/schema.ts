import { integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export interface OrderLine {
  productId: string
  name: string
  unitPriceCents: number
  quantity: number
}

export interface ShippingAddress {
  name?: string
  line1?: string
  line2?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

// One row per PayPal order. Created as "created" when the buyer opens
// PayPal, flipped to "paid" once the payment is captured.
export const orders = pgTable('orders', {
  id: serial().primaryKey(),
  paypalOrderId: text('paypal_order_id').notNull().unique(),
  status: text().notNull().default('created'),
  items: jsonb().$type<Array<OrderLine>>().notNull(),
  subtotalCents: integer('subtotal_cents').notNull(),
  shippingCents: integer('shipping_cents').notNull(),
  totalCents: integer('total_cents').notNull(),
  currency: text().notNull().default('USD'),
  payerName: text('payer_name'),
  payerEmail: text('payer_email'),
  shippingAddress: jsonb('shipping_address').$type<ShippingAddress>(),
  paypalCaptureId: text('paypal_capture_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  paidAt: timestamp('paid_at'),
})
