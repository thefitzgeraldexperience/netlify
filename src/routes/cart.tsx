import { Link, createFileRoute } from '@tanstack/react-router'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { fullName } from '@/data/products'
import { PayPalCheckout } from '@/components/PayPalCheckout'
import {
  FREE_SHIPPING_THRESHOLD_CENTS,
  STORE_NAME,
  formatPrice,
  imageUrl,
} from '@/data/store'

export const Route = createFileRoute('/cart')({
  head: () => ({ meta: [{ title: `Your cart — ${STORE_NAME}` }] }),
  component: CartPage,
})

function CartPage() {
  const { lines, subtotalCents, shippingCents, totalCents, setQuantity, remove } =
    useCart()

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-smoke text-ember">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-ash">Grab a jar of smoked salt or a tin of balm.</p>
        <Link
          to="/"
          hash="shop"
          className="mt-8 rounded-full bg-ember px-7 py-3.5 font-semibold text-char transition hover:bg-ember-light"
        >
          Browse the shop
        </Link>
      </div>
    )
  }

  const toFreeShipping = FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-display text-5xl text-cream">Your cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-cream/10 border-y border-cream/10">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-5 py-6">
              <Link
                to="/products/$productId"
                params={{ productId: product.id }}
                className="shrink-0 overflow-hidden rounded-2xl"
              >
                <img
                  src={imageUrl(product.image, 240, 240)}
                  alt={product.name}
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ember">{product.line}</p>
                  <Link
                    to="/products/$productId"
                    params={{ productId: product.id }}
                    className="font-display text-xl text-cream hover:text-ember"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-ash">
                    {product.size} · {formatPrice(product.priceCents)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-cream/15">
                    <button
                      type="button"
                      aria-label={`Decrease ${fullName(product)}`}
                      onClick={() =>
                        quantity === 1 ? remove(product.id) : setQuantity(product.id, quantity - 1)
                      }
                      className="p-2.5 text-ash hover:text-cream"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${fullName(product)}`}
                      onClick={() => setQuantity(product.id, quantity + 1)}
                      className="p-2.5 text-ash hover:text-cream"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="w-20 text-right font-semibold">
                    {formatPrice(product.priceCents * quantity)}
                  </p>
                  <button
                    type="button"
                    aria-label={`Remove ${fullName(product)}`}
                    onClick={() => remove(product.id)}
                    className="text-ash transition hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-3xl border border-cream/10 bg-smoke/60 p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ash">Subtotal</dt>
              <dd>{formatPrice(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Shipping</dt>
              <dd>{shippingCents === 0 ? 'Free' : formatPrice(shippingCents)}</dd>
            </div>
            <div className="flex justify-between border-t border-cream/10 pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(totalCents)}</dd>
            </div>
          </dl>
          {toFreeShipping > 0 && (
            <p className="mt-4 rounded-xl bg-ember/10 px-3 py-2 text-xs text-ember">
              Add {formatPrice(toFreeShipping)} more for free shipping.
            </p>
          )}
          <div className="mt-6">
            <PayPalCheckout />
          </div>
          <p className="mt-4 text-center text-xs text-ash">
            You'll confirm your shipping address with PayPal.
          </p>
        </aside>
      </div>
    </div>
  )
}
