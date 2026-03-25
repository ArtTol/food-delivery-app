import { useState } from "react";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";

function App() {

  const [page, setPage] = useState("shops");
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  return (
    <div>

      <button onClick={() => setPage("Shops")}>Shop</button>
      <button onClick={() => setPage("Cart")}>Shopping Cart</button>

      {page === "Shops" && <Shops addToCart={addToCart} />}
      {page === "Cart" && <Cart cart={cart} />}

    </div>
  );
}

export default App;