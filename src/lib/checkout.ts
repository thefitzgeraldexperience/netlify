import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import products, { fullName } from '@/data/products'
import { CURRENCY, shippingFor } from '@/data/store'

const cartSchema = z
  .array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1).max(20),
    }),
  )
  .min(1)
  .max(20)

export type CartInput = z.infer<typeof cartSchema>

export const getPaypalConfig = createServerFn({ method: 'GET' }).handler(() => {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? ''
  return {
    enabled: !!clientId && !!process.env.PAYPAL_CLIENT_SECRET,
    // The client ID is public by design — it's embedded in PayPal's browser SDK.
    clientId,
    currency: CURRENCY,
  }
})

export const createPaypalOrder = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => cartSchema.parse(input))
  .handler(async ({ data: cart }) => {
    const { paypalRequest, toValue } = await import('./paypal.server')
    const { db } = await import('../../db/index')
    const { orders } = await import('../../db/schema')

    // Prices always come from the catalog, never from the browser.
    const lines = cart.map(({ productId, quantity }) => {
      const product = products.find((p) => p.id === productId)
      if (!product) throw new Error(`Unknown product: ${productId}`)
      return {
        productId,
        name: fullName(product),
        unitPriceCents: product.priceCents,
        quantity,
      }
    })
    const subtotalCents = lines.reduce(
      (sum, l) => sum + l.unitPriceCents * l.quantity,
      0,
    )
    const shippingCents = shippingFor(subtotalCents)
    const totalCents = subtotalCents + shippingCents

    const order = await paypalRequest<{ id: string }>('/v2/checkout/orders', {
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: 'The Fitzgerald Experience order',
          amount: {
            currency_code: CURRENCY,
            value: toValue(totalCents),
            breakdown: {
              item_total: { currency_code: CURRENCY, value: toValue(subtotalCents) },
              shipping: { currency_code: CURRENCY, value: toValue(shippingCents) },
            },
          },
          items: lines.map((l) => ({
            name: l.name,
            sku: l.productId,
            quantity: String(l.quantity),
            category: 'PHYSICAL_GOODS',
            unit_amount: { currency_code: CURRENCY, value: toValue(l.unitPriceCents) },
          })),
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: 'The Fitzgerald Experience',
            shipping_preference: 'GET_FROM_FILE',
            user_action: 'PAY_NOW',
          },
        },
      },
    })

    await db.insert(orders).values({
      paypalOrderId: order.id,
      items: lines,
      subtotalCents,
      shippingCents,
      totalCents,
      currency: CURRENCY,
    })

    return order.id
  })

interface CaptureResponse {
  id: string
  status: string
  payer?: {
    email_address?: string
    name?: { given_name?: string; surname?: string }
  }
  purchase_units?: Array<{
    shipping?: {
      name?: { full_name?: string }
      address?: {
        address_line_1?: string
        address_line_2?: string
        admin_area_2?: string
        admin_area_1?: string
        postal_code?: string
        country_code?: string
      }
    }
    payments?: { captures?: Array<{ id: string; status: string }> }
  }>
}

export const capturePaypalOrder = createServerFn({ method: 'POST' })
  .inputValidator((orderId: unknown) => z.string().min(1).max(64).parse(orderId))
  .handler(async ({ data: orderId }) => {
    const { paypalRequest } = await import('./paypal.server')
    const { db } = await import('../../db/index')
    const { orders } = await import('../../db/schema')
    const { eq } = await import('drizzle-orm')

    const capture = await paypalRequest<CaptureResponse>(
      `/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
    )
    if (capture.status !== 'COMPLETED') {
      throw new Error('Payment was not completed')
    }

    const unit = capture.purchase_units?.[0]
    const address = unit?.shipping?.address
    const payerName = [capture.payer?.name?.given_name, capture.payer?.name?.surname]
      .filter(Boolean)
      .join(' ')

    await db
      .update(orders)
      .set({
        status: 'paid',
        paidAt: new Date(),
        payerEmail: capture.payer?.email_address,
        payerName: payerName || null,
        paypalCaptureId: unit?.payments?.captures?.[0]?.id,
        shippingAddress: address
          ? {
              name: unit?.shipping?.name?.full_name,
              line1: address.address_line_1,
              line2: address.address_line_2,
              city: address.admin_area_2,
              state: address.admin_area_1,
              postalCode: address.postal_code,
              country: address.country_code,
            }
          : null,
      })
      .where(eq(orders.paypalOrderId, orderId))

    return { orderId }
  })

export const getOrderSummary = createServerFn({ method: 'GET' })
  .inputValidator((orderId: unknown) => z.string().min(1).max(64).parse(orderId))
  .handler(async ({ data: orderId }) => {
    const { db } = await import('../../db/index')
    const { orders } = await import('../../db/schema')
    const { eq } = await import('drizzle-orm')

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.paypalOrderId, orderId))
      .limit(1)
    if (!order || order.status !== 'paid') return null

    // Only what the confirmation page needs — no email or address.
    return {
      orderNumber: order.id,
      items: order.items,
      subtotalCents: order.subtotalCents,
      shippingCents: order.shippingCents,
      totalCents: order.totalCents,
      firstName: order.payerName?.split(' ')[0] ?? null,
    }
  })
