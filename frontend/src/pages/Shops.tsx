import { useEffect, useState } from "react";
import "./Shops.css";

export default function Shops({ addToCart }: any) {
  const [shops, setShops] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/shops")
      .then(res => res.json())
      .then(data => setShops(data));

    // temporary products (you can later fetch from backend)
    setProducts([
      { id: 1, name: "Big Burger" },
      { id: 2, name: "McDonald's" },
      { id: 3, name: "KFC" },
      { id: 4, name: "Ashan" },
      { id: 5, name: "Universam"},
      { id: 5, name: "McBurger"},
      { id: 6, name: "Silpo"}
    ]);
  }, []);

  return (
    <div className="container">
      
      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h3>Shops:</h3>
        {shops.map(shop => (
          <button key={shop.id} className="shop-btn">
            {shop.name}
          </button>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="content">
        <div className="grid">
          {products.map(product => (
            <div key={product.id} className="card">
              <div className="image"></div>
              <p>{product.name}</p>
              <button onClick={() => addToCart(product)}>
                add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
