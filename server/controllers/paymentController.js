import Stripe from "stripe";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || ""
);


export const createPaymentIntent = asyncHandler(async (req, res) => {
  try {
    console.log("Payment intent request received");
    console.log("Request method:", req.method);
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    console.log("Request body type:", typeof req.body);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Raw body available:", !!req.rawBody);

    if (!req.body) {
      console.log("Request body is missing - debugging info:");
      console.log("req.body:", req.body);
      console.log("req.body === null:", req.body === null);
      console.log("req.body === undefined:", req.body === undefined);
      console.log("Object.keys(req.body):", Object.keys(req.body || {}));

      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const { orderId, amount, currency = "usd" } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Order ID and amount are required",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.userId.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to pay for this order",
      });
    }

    if (order.status === "paid" || order.isPaid) {
      return res.status(400).json({
        success: false,
        message: "This order has already been paid",
      });
    }

    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      metadata: {
        orderId: orderId.toString(), 
        userId: req.user._id.toString(), 
        userEmail: req.user.email,
      },
      payment_method_types: ["card"],
      description: `Payment for Baby Shop Order #${orderId
        .slice(-8)
        .toUpperCase()}`,
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      message: "Payment intent created successfully",
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment intent",
    });
  }
});


export const handleStripeWebhook = asyncHandler(async (req, res) => {
  console.log("🎣 Webhook received");


  if (process.env.NODE_ENV === "production") {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return res.status(400).send("Webhook secret not configured");
    }

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    console.log("Development mode: webhook signature verification disabled")

    console.log("Webhook body (development):", req.body);

    if (req.body && req.body.type) {
      const event = req.body;

      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log(
            "Payment succeeded:",
            paymentIntent.id,
            paymentIntent.metadata,
            event.type
          );

          const orderId = paymentIntent.metadata.orderId;
          if (orderId) {
            try {
              const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                {
                  status: "paid",
                  isPaid: true,
                  paidAt: new Date(),
                  paymentIntentId: paymentIntent.id,
                },
                { new: true }
              );

              if (updatedOrder) {
                console.log("Order status updated via webhook:", orderId);
              } else {
                console.log("Order not found for update:", orderId);
              }
            } catch (error) {
              console.error("Failed to update order via webhook:", error);
            }
          }
          break;

        case "payment_intent.payment_failed":
          console.log("Payment failed:", event.data.object.id);
          break;

        case "payment_intent.created":
          console.log(" Payment intent created:", event.data.object.id);
          break;

        default:
          console.log(` Unhandled event type: ${event.type}`);
      }
    }
  }

  res.json({ received: true });
});
