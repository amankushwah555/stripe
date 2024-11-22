const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = Stripe(
  "sk_test_51QO0e6ARbu8YeHzyxOsaStLkZWWgabmZxwdKSAlSzBne3OA3RuVt4SpZNLXJYYNHJ0OQQVEyp5lNqflsUz716U5900kkHfGtrW"
);
const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req: any, res: any) => {
  const { amount, name, email } = req.body;
  console.log(amount, name, email);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      discounts: [
        {
          coupon: "pFJPZ8du",
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error!" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
