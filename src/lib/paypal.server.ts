// Thin wrapper around the PayPal REST API (Orders v2). Server-only.

function apiBase() {
  return process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
}

async function accessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !secret) {
    throw new Error('PayPal is not configured')
  }
  const res = await fetch(`${apiBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) {
    throw new Error(`PayPal auth failed (${res.status})`)
  }
  const json = (await res.json()) as { access_token: string }
  return json.access_token
}

export async function paypalRequest<T>(path: string, body?: unknown): Promise<T> {
  const token = await accessToken()
  const res = await fetch(`${apiBase()}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    console.error('PayPal API error', path, res.status, json)
    throw new Error(`PayPal request failed (${res.status})`)
  }
  return json as T
}

export const toValue = (cents: number) => (cents / 100).toFixed(2)
