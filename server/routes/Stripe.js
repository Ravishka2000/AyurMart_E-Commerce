import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();
const app = express();

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'Rs',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url: session.url });
  });

export default router;