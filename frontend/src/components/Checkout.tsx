import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

function Checkout() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(50);

  const stripePromise = loadStripe(
    "pk_test_51QO0e6ARbu8YeHzyh5xNnvFxE9W8UDdsAaalSOSZPUDgcx6zos2CnMM82gETVBMDyDnpUXxFBEznCksUXDXOXnR000VTwK3ROg"
  );

  const handleClickAmount = (amount: any) => {
    setAmount(amount);
  };

  const handleSubmit = async (e) => {
    console.log("FORM", e);
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3001/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          amount,
        }),
      }
    );

    const session = await response.json();
    console.log("SESSION", session);

    const stripe = await stripePromise;

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    console.log("RESULT", result);

    if (result.error) {
      alert(result.error.message);
    }
    console.log(result);
  };

  return (
    <>
      <h1>Checkout </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            onClick={() => {
              handleClickAmount(50);
            }}
          >
            50
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              handleClickAmount(100);
            }}
          >
            100
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              handleClickAmount(250);
            }}
          >
            250
          </button>
        </div>
        <div>amount: {amount}</div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Checkout;
