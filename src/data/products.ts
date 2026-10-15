export type Category = 'balm' | 'salt'

export interface Product {
  id: string
  name: string
  line: string
  category: Category
  size: string
  priceCents: number
  image: string
  shortDescription: string
  description: string
  details: Array<string>
  // Copied from the jar labels and the balm ingredient card.
  ingredients?: string
  heat?: HeatLevel
}

export type HeatLevel = 'none' | 'mild' | 'high' | 'insane'

// Label border color for each heat level, used for heat badges on the site.
export const heatColors: Record<HeatLevel, string> = {
  none: '#9c5f37',
  mild: '#e5bd0b',
  high: '#ff7f0f',
  insane: '#d10a0a',
}

// The product catalog. This is the single source of truth for names and
// prices — checkout totals are always recalculated from this file on the
// server, so editing a price here is all that's needed.
const products: Array<Product> = [
  {
    id: 'rally-recoup',
    name: 'Rally Recoup',
    line: 'The Body Experience',
    category: 'balm',
    size: '2 oz tin',
    priceCents: 1600,
    image: '/img/balm-rally-recoup.png',
    shortDescription:
      'A rich recovery balm for tired muscles and hardworking skin.',
    description:
      'What you reach for before a run, the hard workout, or the double shift. Natural and hand-crafted in small batches, it melts on contact and works into any spot that needs a little extra glide and smoothness — whether before or after some action, always Rally Recoup.',
    details: [
      'Hand-poured in small batches',
      'Melts on contact, absorbs without a greasy finish',
      'Pocket-sized 2 oz tin',
    ],
    ingredients:
      'Hemp seed oil, mango butter, beeswax, calendula flower extract, frankincense oil, lavender oil, benzoin resin, patchouli oil, rosemary leaf extract',
  },
  {
    id: 'ink-nourish',
    name: 'Nourish',
    line: 'The Ink Experience',
    category: 'balm',
    size: '2 oz tin',
    priceCents: 1600,
    image: '/img/balm-ink-nourish.png',
    shortDescription:
      'A nourishing balm made to keep tattooed skin soft and ink looking bold.',
    description:
      'Nourish was made for people who wear their art. A deeply moisturizing balm that keeps tattooed skin supple and helps your ink look crisp and vibrant, day after day. Whether you got your tattoo today or 20 years ago, keep it NOURISHED.',
    details: [
      'Made for everyday tattoo care',
      'Deeply moisturizing, a little goes a long way',
      'Pocket-sized 2 oz tin',
    ],
    ingredients:
      'Hemp seed oil, mango butter, jojoba oil, calendula flower extract, beeswax, candelilla wax, frankincense oil, lavender oil, benzoin resin, rosemary leaf extract',
  },
    {
    id: 'ink-nourish-tub',
    name: 'Nourish',
    line: 'The Ink Experience',
    category: 'balm',
    size: '8 oz tin',
    priceCents: 4000,
    image: '/img/balm-ink-nourish-tub-mockup.png',
    shortDescription:
      'A nourishing balm made to keep tattooed skin soft and ink looking bold.',
    description:
      'Nourish was made for people who wear their art. A deeply moisturizing balm that keeps tattooed skin supple and helps your ink look crisp and vibrant, day after day. Whether you got your tattoo today or 20 years ago, keep it NOURISHED.',
    details: [
      'Made for everyday tattoo care',
      'Deeply moisturizing, a little goes a long way',
      'Pocket-sized 8 oz tin',
    ],
    ingredients:
      'Hemp seed oil, mango butter, jojoba oil, calendula flower extract, beeswax, candelilla wax, frankincense oil, lavender oil, benzoin resin, rosemary leaf extract',
  },
  // Smoked salts — all four share the same cold-smoked salt base and differ
  // only in heat level. Names, net weight, and ingredients match the jar labels;
  // prices and descriptions are starting points.
  {
    id: 'no-heat-just-smoke',
    name: 'No Heat, Just Smoke',
    line: 'Smoke Salt',
    category: 'salt',
    size: '4 oz (113g)',
    priceCents: 1000,
    image: '/img/salt-no-heat.png',
    shortDescription: 'Our cold-smoked salt, pure and simple. All smoke, zero heat.',
    description:
      'This is where it all starts: the same cold-smoked salt that forms the base of every blend we make, with no heat added. Deep, clean smoke and a satisfying crunch — finish a steak, season eggs, rim a glass, or bring barbeque flavor to anything that needs it.',
    details: [
      'Our signature cold-smoked salt base',
      'Made in St. Louis, Missouri',
      'Great on steak, eggs, and cocktails',
    ],
    ingredients: 'Salt, smoke',
    heat: 'none',
  },
  {
    id: 'maybe-dont-mild-heat',
    name: 'Mild Heat Smoked Salt',
    line: "Maybe Don't",
    category: 'salt',
    size: '4 oz (113g)',
    priceCents: 1200,
    image: '/img/salt-maybe-dont.png',
    shortDescription: 'Cold-smoked salt with a gentle warmth that sneaks up on you.',
    description:
      'Our cold-smoked salt base with just enough heat to make you notice. A friendly, everyday kick that wakes up eggs, popcorn, roasted potatoes, and grilled chicken without taking over.',
    details: [
      'Built on our cold-smoked salt base',
      'Made in St. Louis, Missouri',
      'A perfect vegetable campanion',
    ],
    ingredients: 'Salt, chili peppers, smoke',
    heat: 'mild',
  },
  {
    id: 'stop-no-dont-high-heat',
    name: 'High Heat Smoked Salt',
    line: "Stop, No, Don't",
    category: 'salt',
    size: '4 oz (113g)',
    priceCents: 1200,
    image: '/img/salt-stop-no-dont.png',
    shortDescription: 'The perfect ammount of heat over deep smoke.',
    description:
      'The same cold-smoked salt base, turned up hot. The heat comes on quick and smoothly fades to an enjoyable smokey tang.',
    details: [
      'Built on our cold-smoked salt base',
      'Made in St. Louis, Missouri',
      'Great on EVERYTHING!',
    ],
    ingredients: 'Salt, chili peppers, smoke',
    heat: 'high',
  },
  {
    id: 'no-truly-dont-insane-heat',
    name: 'Insane Heat Smoked Salt',
    line: "No, Truly Don't",
    category: 'salt',
    size: '4 oz (113g)',
    priceCents: 1500,
    image: '/img/salt-no-truly-dont.png',
    shortDescription: 'Our hottest salt by a mile. Seriously — a pinch is too much.',
    description:
      'Cold-smoked salt pushed to the edge. This one is for heat chasers only: a tiny pinch brings an intense, building burn wrapped in deep smoke. Start small, keep a glass of milk nearby, and don’t say we didn’t tell you.',
    details: [
      'Built on our cold-smoked salt base',
      'Made in St. Louis, Missouri',
      'Use sparingly — a pinch goes too far',
    ],
    ingredients: 'Salt, chili peppers, smoke',
    heat: 'insane',
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function fullName(product: Product) {
  return `${product.line} | ${product.name}`
}

export default products
