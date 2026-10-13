import { Flame } from 'lucide-react'
import type { HeatLevel } from '@/data/products'
import { heatColors } from '@/data/products'

const levels: Array<HeatLevel> = ['none', 'mild', 'high', 'insane']

// Three flames that fill in with the label color as heat goes up.
export function HeatBadge({ heat, size = 'sm' }: { heat: HeatLevel; size?: 'sm' | 'lg' }) {
  const lit = levels.indexOf(heat)
  const color = heatColors[heat]
  const icon = size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border bg-char/80 font-display uppercase italic tracking-[0.12em] text-cream backdrop-blur ${size === 'lg' ? 'px-4 py-1.5 text-base' : 'px-3 py-1 text-xs'}`}
      style={{ borderColor: color }}
    >
      <span className="flex" aria-hidden>
        {[1, 2, 3].map((n) => (
          <Flame
            key={n}
            className={icon}
            style={n <= lit ? { color, fill: color } : { color: 'rgb(247 247 245 / 0.25)' }}
          />
        ))}
      </span>
      {heat === 'none' ? 'No heat' : `${heat} heat`}
    </span>
  )
}
