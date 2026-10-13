import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Flame, HandHeart, Leaf } from 'lucide-react'
import products, { type Category } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { imageUrl } from '@/data/store'

export const Route = createFileRoute('/')({
  component: Home,
})

const filters: Array<{ value: Category | 'all'; label: string }> = [
  { value: 'all', label: 'Everything' },
  { value: 'salt', label: 'Smoked salts' },
  { value: 'balm', label: 'Body balms' },
]

function Home() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const visible = products.filter((p) => filter === 'all' || p.category === filter)

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={imageUrl('/img/hero.png', 1800)}
          srcSet={`${imageUrl('/img/hero.png', 900)} 900w, ${imageUrl('/img/hero.png', 1400)} 1400w, ${imageUrl('/img/hero.png', 2000)} 2000w`}
          sizes="100vw"
          alt="Jars of smoked salt and tins of body balm on a charred wooden board"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-char via-char/80 to-char/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-char to-transparent" />

        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-5 py-24">
          <p className="rise text-xs uppercase tracking-[0.3em] text-ember">
            Small batch · Handmade
          </p>
          <h1 className="rise mt-5 max-w-2xl font-display text-5xl uppercase leading-[0.95] text-cream [animation-delay:100ms] sm:text-7xl">
            Smoke for the table.
            <br />
            <span className="italic text-ember">Balm for the body.</span>
          </h1>
          <p className="rise mt-6 max-w-lg text-lg leading-relaxed text-cream/80 [animation-delay:200ms]">
            The Fitzgerald Experience makes cold-smoked salts and rich,
            hand-poured balms — little things that make every day a bit better.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3 [animation-delay:300ms]">
            <a
              href="#shop"
              className="rounded-full bg-ember px-7 py-3.5 font-semibold text-char transition hover:bg-ember-light"
            >
              Shop the collection
            </a>
            <Link
              to="/products/$productId"
              params={{ productId: 'rally-recoup' }}
              className="rounded-full border border-cream/25 px-7 py-3.5 font-semibold text-cream transition hover:border-cream"
            >
              Meet Rally Recoup
            </Link>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ember">The shop</p>
            <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
              Everything we make
            </h2>
          </div>
          <div className="flex gap-2 rounded-full border border-cream/10 bg-smoke/60 p-1" role="tablist">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  filter === f.value
                    ? 'bg-cream text-char'
                    : 'text-ash hover:text-cream'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="border-y border-cream/10 bg-smoke/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Our story</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">
              Made slowly, <span className="italic">on purpose.</span>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ash">
              Every jar of salt starts with the same slow, cold-smoked base. Every tin
              of balm is poured by hand. We keep batches small so everything
              that leaves our kitchen is something we'd use ourselves — at the
              grill, after the gym, or on fresh ink.
            </p>
          </div>
          <ul className="grid gap-4">
            {[
              { icon: Flame, title: 'Cold-smoked salt', body: 'One smoky base, four heat levels — from none to insane.' },
              { icon: HandHeart, title: 'Hand-poured balms', body: 'Body and ink care made in small batches.' },
              { icon: Leaf, title: 'Simple & honest', body: 'Thoughtful ingredients, no fuss, no filler.' },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-cream/10 bg-char/60 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember/15 text-ember">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-cream">{title}</p>
                  <p className="mt-1 text-sm text-ash">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
