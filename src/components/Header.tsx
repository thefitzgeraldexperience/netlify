import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'

export function Header() {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-char/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src="/img/tfe_logo.png" alt="" className="h-9 w-auto" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-lg text-cream sm:text-xl">
              The Fitzgerald
            </span>
            <span className="font-display text-lg italic text-ember sm:text-xl">
              Experience
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm sm:gap-4">
          <Link
            to="/"
            hash="shop"
            className="hidden rounded-full px-3 py-2 text-ash transition hover:text-cream sm:block"
          >
            Shop
          </Link>
          <Link
            to="/"
            hash="story"
            className="hidden rounded-full px-3 py-2 text-ash transition hover:text-cream sm:block"
          >
            Our story
          </Link>
          <Link
            to="/contact"
            className="hidden rounded-full px-3 py-2 text-ash transition hover:text-cream sm:block"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-cream transition hover:border-ember hover:text-ember"
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1.5 text-xs font-semibold text-char">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
