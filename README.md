# The Fitzgerald Experience

Online shop for The Fitzgerald Experience — small-batch smoked sea salts and handmade body balms — with a cart and PayPal checkout.

## What's in it

- **Home** (`/`) — hero, filterable product grid (smoked salts / body balms), and brand story.
- **Product pages** (`/products/:id`) — photos, details, quantity picker, related products.
- **Cart** (`/cart`) — edit quantities, see shipping, and pay with PayPal (PayPal account or debit/credit card).
- **Order confirmation** (`/checkout/success`) — receipt summary after payment.

Every paid order is recorded in Netlify Database (items, totals, buyer name/email, shipping address).

## Tech

TanStack Start (React 19, Vite 7), Tailwind CSS 4, PayPal Orders v2 REST API + PayPal JS SDK, Netlify Database (Postgres) with Drizzle ORM, Netlify Image CDN.

## Setting up PayPal

Create a REST app at <https://developer.paypal.com/dashboard/applications> and add these environment variables in Netlify (Site configuration → Environment variables):

| Variable | Value |
|---|---|
| `PAYPAL_CLIENT_ID` | Your app's client ID |
| `PAYPAL_CLIENT_SECRET` | Your app's secret |
| `PAYPAL_ENV` | `sandbox` for testing, `live` to take real payments |

Until both keys are set the cart shows "Online checkout is opening soon" instead of the PayPal buttons. Sandbox and live use different keys — switch both keys when you set `PAYPAL_ENV=live`.

## Editing products & shipping

- Products, prices, and descriptions: `src/data/products.ts`. Prices are in cents (`1600` = $16.00). Checkout always uses these prices server-side.
- Shipping rules (flat $6, free over $50): `src/data/store.ts`.
- Product photos live in `public/img/`.

## Running locally

```bash
pnpm install
netlify dev
```

`netlify dev` provides the local database and environment variables. Use PayPal sandbox keys locally.

## Viewing orders

Orders appear in your PayPal dashboard. They're also stored in the `orders` table — inspect them with:

```bash
netlify db connect --query "SELECT id, status, payer_name, total_cents, created_at FROM orders ORDER BY id DESC"
```

## Ideas for later

- A password-protected admin page to view orders and mark them shipped.
- Order confirmation emails sent from the shop.
- Inventory counts / "sold out" badges.
