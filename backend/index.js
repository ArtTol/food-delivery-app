const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "food_app",
  password: 70989,
  port: 5433,
});
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// SHOPS ROUTE
app.get("/shops", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM shops");
    res.json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).send("Database error");
  }
});

// ORDER ROUTE
app.post("/order", async (req, res) => {
  try {
    const { name, email, phone, address, items } = req.body;

    // 1. Insert order
    const orderResult = await pool.query(
      "INSERT INTO orders (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, email, phone, address]
    );

    const orderId = orderResult.rows[0].id;

    // 2. Insert items
    for (let item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ($1, $2, $3, $4)",
        [orderId, item.name, item.price || 100, 1]
      );
    }

    res.send("Order saved to database");

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).send("Error saving order");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});