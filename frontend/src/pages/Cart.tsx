import { useState } from "react";
import "./Cart.css";

export default function Cart({ cart }: any) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce((sum: number, item: any) => sum + (item.price || 100), 0);

  const submitOrder = () => {
    const order = {
      name,
      email,
      phone,
      address,
      items: cart
    };

    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    alert("Order submitted");
  };

  return (
    <div className="cart-container">

      {/* LEFT FORM */}
      <div className="form-section">

        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />

        <label>Phone:</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} />

        <label>Address:</label>
        <input value={address} onChange={e => setAddress(e.target.value)} />

      </div>

      {/* RIGHT CART */}
      <div className="cart-items">

        {cart.map((item: any, index: number) => (
          <div className="cart-card" key={index}>

            <div className="cart-image"></div>

            <div>
              <h4>{item.name}</h4>
              <p>Price: {item.price || 100}</p>

              <input type="number" defaultValue={1} min="1"/>
            </div>

          </div>
        ))}

        <hr/>

        <h3>Total price: {totalPrice}</h3>

        <button onClick={submitOrder}>Submit</button>

      </div>

    </div>
  );
}
