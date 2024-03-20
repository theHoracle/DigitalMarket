import express from "express";
import { stripe } from "./lib/stripe";
import { WebHookRequest } from "./server";
import type Stripe from "stripe";
import { getPayloadClient } from "./get-payload";
import { Product } from "./payload-types";
import { Resend } from "resend";
import { RecieptEmailHtml } from "./components/emails/RecieptEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export const stripeWebHookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  // validate that the request actually comes from stripe
  // update the _isPaid value of the proposed order
  // send reciept email
  const webHookRequest = req as any as WebHookRequest;
  const body = webHookRequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    return res
      .status(400)
      .send(
        `Webhook Error: ${
          error instanceof Error ? error.message : "UNKNOWN ERROR!"
        }`
      );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (!session?.metadata?.userId || !session?.metadata?.orderId) {
    return res.status(400).send("Webhook Error: No user present in metadata");
  }

  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });
    const [user] = users;
    if (!user) {
      return res.status(400).json({ error: "NO SUCH USER EXIST!" });
    }

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });
    const [order] = orders;

    if (!order) {
      return res.status(400).json({ error: "NO SUCH ORDER EXIST!" });
    }

    await payload.update({
      collection: "orders",
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    // send email
    try {
      const data = await resend.emails.send({
        from: "MemeMarket  <princemjames2@gmail.com>",
        to: [user.email],
        subject: "Thanks for your order! This is your reciept.",
        html: RecieptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: session.metadata.orderId,
          products: order.products as Product[],
        }),
      });
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  return res.status(200).send();
};
