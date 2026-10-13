import { Link } from '@tanstack/react-router'
import type { Product } from '@/data/products'
import { fullName } from '@/data/products'
import { formatPrice, imageUrl } from '@/data/store'
import { AddToCartButton } from './AddToCartButton'
import { HeatBadge } from './HeatBadge'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-cream/10 bg-smoke/60 transition hover:border-ember/40">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="relative block aspect-square overflow-hidden"
      >
        <img
          src={imageUrl(product.image, 640, 640)}
          srcSet={`${imageUrl(product.image, 420, 420)} 420w, ${imageUrl(product.image, 640, 640)} 640w, ${imageUrl(product.image, 900, 900)} 900w`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={fullName(product)}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-char/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cream backdrop-blur">
          {product.category === 'balm' ? 'Body balm' : 'Smoked salt'}
        </span>
        {product.heat && (
          <span className="absolute bottom-4 left-4">
            <HeatBadge heat={product.heat} />
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-sm uppercase italic tracking-[0.12em] text-ember">{product.line}</p>
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="mt-1 font-display text-2xl text-cream transition hover:text-ember"
        >
          {product.name}
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">
          {product.shortDescription}
        </p>
        <div className="mt-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-semibold text-cream">
              {formatPrice(product.priceCents)}
            </p>
            <p className="text-xs text-ash">{product.size}</p>
          </div>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </article>
  )
}
