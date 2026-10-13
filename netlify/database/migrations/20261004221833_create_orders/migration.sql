CREATE TABLE "orders" (
	"id" serial PRIMARY KEY,
	"paypal_order_id" text NOT NULL UNIQUE,
	"status" text DEFAULT 'created' NOT NULL,
	"items" jsonb NOT NULL,
	"subtotal_cents" integer NOT NULL,
	"shipping_cents" integer NOT NULL,
	"total_cents" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"payer_name" text,
	"payer_email" text,
	"shipping_address" jsonb,
	"paypal_capture_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"paid_at" timestamp
);
