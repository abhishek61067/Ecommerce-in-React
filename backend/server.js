// server.js or routes/checkout.js
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const allowedOrigins = [
  frontendUrl,
  "http://localhost:5173",
  "https://ecommerce-codeek-2026.web.app",
  "https://www.ecommerce-codeek-2026.web.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options(/.*/, cors());
app.use(express.json());

// create-checkout-session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    // store cartItems in DB or temporary memory (example uses mock orderId)
    const orderId = Date.now(); // replace with DB storage & ID

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.thumbnail],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

   const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items,
  mode: "payment",
  success_url: `${frontendUrl}/success`,
  cancel_url: `${frontendUrl}/cart`,
});

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
