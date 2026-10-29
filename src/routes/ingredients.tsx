import { createFileRoute } from '@tanstack/react-router'
import { STORE_NAME } from '@/data/store'

export const Route = createFileRoute('/ingredients')({
  head: () => ({
    meta: [
      { title: `What's in the Tin — ${STORE_NAME}` },
      {
        name: 'description',
        content:
          'The traditional skin care uses of the ingredients in our balms.',
      },
    ],
  }),
  component: IngredientsPage,
})

const INGREDIENTS: { name: string; note?: string; body: string }[] = [
  {
    name: 'Hemp seed oil',
    body: 'Helps with dry, rough skin. Rich in linoleic acid and GLA, fatty acids associated with a healthy skin barrier.',
  },
  {
    name: 'Mango butter',
    body: 'Softens and moisturizes dry, weathered skin. Rich in fatty acids and plant antioxidants.',
  },
  {
    name: 'Calendula',
    body: 'A staple of herbal skincare, valued for minor skin irritation and dry, sensitive-feeling skin.',
  },
  {
    name: 'Beeswax',
    body: 'A salve ingredient for sealing in moisture and protecting chapped, windblown skin.',
  },
  {
    name: 'Jojoba oil',
    note: 'Nourish',
    body: "Used to moisturize and condition skin. Its structure closely resembles the skin's own sebum.",
  },
  {
    name: 'Frankincense',
    body: 'Found in skin preparations for dryness and the look of aging skin. Contains boswellic acids.',
  },
  {
    name: 'Lavender',
    body: 'Reached for in minor skin irritation, and a gentle, cleansing addition to skin preparations.',
  },
  {
    name: 'Benzoin resin',
    body: 'A skin protectant, often turned to for chapped or cracked-feeling skin.',
  },
  {
    name: 'Patchouli',
    note: 'Rally & Recoup',
    body: 'A folk skincare ingredient for dry, rough skin.',
  },
  {
    name: 'Rosemary oleoresin extract',
    body: 'A natural antioxidant that keeps the oils in each balm fresh.',
  },
]

function IngredientsPage() {
  {/* return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <h1 className="font-display text-5xl text-cream">What's in the Tin</h1>
      <p className="mt-4 text-ash">
        Traditionally, people have turned to these ingredients for skin care.
        Here's what each is known for helping with.
      </p>

      <ul className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
        {INGREDIENTS.map((i) => (
          <li key={i.name} className="py-5">
            <h2 className="font-display text-xl italic text-cream">
              {i.name}
              {i.note && (
                <span className="ml-2 text-sm not-italic text-ember">
                  {i.note}
                </span>
              )}
            </h2>
            <p className="mt-1 text-ash">{i.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm italic text-ash">
        These traditional uses are provided for background and are not claims
        about our products. Our balms are cosmetics and are not intended to
        diagnose, treat, cure, or prevent any disease. Patch test before use.
      </p>
    </div>
  ) */}
  return (
  <div className="mx-auto max-w-5xl px-5 py-24">
    <h1 className="font-display text-5xl text-cream">What's in the Tin</h1>
    <p className="mt-4 max-w-2xl text-ash">
      Traditionally, people have turned to these ingredients for skin care.
      Here's what each is known for helping with.
    </p>

    <ul className="mt-10 list-disc space-y-4 pl-5 marker:text-ember md:columns-2 md:gap-x-14">
      {INGREDIENTS.map((i) => (
        <li key={i.name} className="break-inside-avoid text-ash">
          <span className="font-display text-lg italic text-cream">
            {i.name}
          </span>
          {i.note && (
            <span className="ml-2 text-sm text-ember">{i.note}</span>
          )}
          <span className="block">{i.body}</span>
        </li>
      ))}
    </ul>

    <p className="mt-10 max-w-2xl text-sm italic text-ash">
      These traditional uses are provided for background and are not claims
      about our products. Our balms are cosmetics and are not intended to
      diagnose, treat, cure, or prevent any disease. Patch test before use.
    </p>
  </div>
)
}
