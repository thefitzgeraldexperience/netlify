import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart'

export function AddToCartButton({
  productId,
  quantity = 1,
  size = 'md',
}: {
  productId: string
  quantity?: number
  size?: 'md' | 'lg'
}) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    add(productId, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  const sizing = size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm'

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-ember font-semibold text-char transition hover:bg-ember-light active:scale-[0.98] ${sizing}`}
    >
      {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {added ? 'Added' : 'Add to cart'}
    </button>
  )
}
