import { Link, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import { getOrderSummary } from '@/lib/checkout'
import { STORE_NAME, formatPrice } from '@/data/store'

export const Route = createFileRoute('/checkout/success')({
  validateSearch: z.object({ order: z.string().optional() }),
  loaderDeps: ({ search }) => ({ order: search.order }),
  loader: async ({ deps }) =>
    deps.order ? getOrderSummary({ data: deps.order }).catch(() => null) : null,
  head: () => ({ meta: [{ title: `Thank you — ${STORE_NAME}` }] }),
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  const order = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <div className="rise rounded-3xl border border-cream/10 bg-smoke/60 p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-ember" />
        <h1 className="mt-6 font-display text-4xl">
          Thank you{order?.firstName ? `, ${order.firstName}` : ''}!
        </h1>
        <p className="mt-3 text-ash">
          Your payment went through and your order is being packed. A receipt
          is on its way from PayPal.
        </p>

        {order && (
          <div className="mt-8 text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-ember">
              Order #{order.orderNumber}
            </p>
            <ul className="mt-3 divide-y divide-cream/10 border-y border-cream/10 text-sm">
              {order.items.map((item) => (
                <li key={item.productId} className="flex justify-between py-3">
                  <span>
                    {item.name} <span className="text-ash">× {item.quantity}</span>
                  </span>
                  <span>{formatPrice(item.unitPriceCents * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between text-ash">
                <dt>Shipping</dt>
                <dd>{order.shippingCents === 0 ? 'Free' : formatPrice(order.shippingCents)}</dd>
              </div>
              <div className="flex justify-between font-semibold">
                <dt>Total paid</dt>
                <dd>{formatPrice(order.totalCents)}</dd>
              </div>
            </dl>
          </div>
        )}

        <Link
          to="/"
          className="mt-10 inline-block rounded-full bg-ember px-7 py-3.5 font-semibold text-char transition hover:bg-ember-light"
        >
          Back to the shop
        </Link>
      </div>
    </div>
  )
}
