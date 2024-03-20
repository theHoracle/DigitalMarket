import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

// https://mail.google.com/mail/u/princemjames2@gmail.com/#search/from:notifications@stripe.com
