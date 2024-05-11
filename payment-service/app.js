import express from 'express';
import cors from 'cors';
import stripe from 'stripe';
import dotenv from 'dotenv';
import { connect } from './config/db_con.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const stripeClient = stripe(process.env.STRIPE_KEY);

app.post('/checkout', async (req, res) => {
  console.log(req.body);

  const courses = req.body.courses;
  const courseItems = courses.map((courses) => ({
    price: courses.id,
    quantity: 1,
  }));

  const session = await stripeClient.checkout.sessions.create({
    line_items: courseItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.send(JSON.stringify({ url: session.url }));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Payment service is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
