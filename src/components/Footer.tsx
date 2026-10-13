import { FREE_SHIPPING_THRESHOLD_CENTS, STORE_NAME, formatPrice } from '@/data/store'

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-char">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 text-sm text-ash sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-cream">{STORE_NAME}</p>
          <p className="mt-2 max-w-xs">
            Smoked salts for the kitchen and balms for the body — made by hand,
            in small batches in St. Louis, Missouri.
          </p>
          <a
            href="https://www.instagram.com/thefitzgeraldexperience"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-display italic text-cream transition hover:text-ember"
          >
            @thefitzgeraldexperience
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cream/60">Shipping</p>
          <p className="mt-2">
            Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD_CENTS)}.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cream/60">Payments</p>
          <p className="mt-2">Secure checkout with PayPal or debit / credit card.</p>
        </div>
      </div>
      <div className="border-t border-cream/5 py-5 text-center text-xs text-ash/60">
        © {new Date().getFullYear()} {STORE_NAME}
      </div>
    </footer>
  )
}
