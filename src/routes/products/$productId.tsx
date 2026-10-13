import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react'
import products, { fullName, getProduct } from '@/data/products'
import { AddToCartButton } from '@/components/AddToCartButton'
import { HeatBadge } from '@/components/HeatBadge'
import { ProductCard } from '@/components/ProductCard'
import { STORE_NAME, formatPrice, imageUrl } from '@/data/store'

export const Route = createFileRoute('/products/$productId')({
  loader: ({ params }) => {
    const product = getProduct(params.productId)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${fullName(loaderData)} — ${STORE_NAME}` },
          { name: 'description', content: loaderData.shortDescription },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/" hash="shop" className="mt-6 inline-block text-ember underline">
        Back to the shop
      </Link>
    </div>
  ),
})

function ProductPage() {
  const product = Route.useLoaderData()
  const [quantity, setQuantity] = useState(1)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link
        to="/"
        hash="shop"
        className="inline-flex items-center gap-2 text-sm text-ash transition hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" /> Back to the shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-3xl border border-cream/10">
          <img
            key={product.id}
            src={imageUrl(product.image, 1000, 1000)}
            srcSet={`${imageUrl(product.image, 600, 600)} 600w, ${imageUrl(product.image, 1000, 1000)} 1000w, ${imageUrl(product.image, 1400, 1400)} 1400w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={fullName(product)}
            className="rise aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-display text-base uppercase italic tracking-[0.15em] text-ember">{product.line}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-cream">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatPrice(product.priceCents)}</span>
            <span className="text-sm text-ash">{product.size}</span>
          </div>
          {product.heat && (
            <div className="mt-5">
              <HeatBadge heat={product.heat} size="lg" />
            </div>
          )}
          <p className="mt-6 leading-relaxed text-cream/80">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-ash">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" /> {d}
              </li>
            ))}
          </ul>
          {product.ingredients && (
            <p className="mt-6 text-sm text-ash">
              <span className="font-display uppercase italic tracking-[0.12em] text-cream">
                Ingredients:
              </span>{' '}
              {product.ingredients}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-cream/15">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-ash transition hover:text-cream"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="p-3 text-ash transition hover:text-cream"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <AddToCartButton productId={product.id} quantity={quantity} size="lg" />
          </div>
          <Link to="/cart" className="mt-4 text-sm text-ash underline-offset-4 hover:text-cream hover:underline">
            View cart & check out
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl text-cream">You might also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
