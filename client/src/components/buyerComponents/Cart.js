import React, { useState, useEffect} from 'react';
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWM1YWNkMWI4MTExNzRiYWFkYzk2NSIsImlhdCI6MTY4MDk1NTIyNCwiZXhwIjoxNjgxMDQxNjI0fQ.ePXQsRSbugwl1ixrptCr19FHTGEoTfRE3MsLBQR1fFs"
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:7002/api/user/cart",
          config
        );
        setCart(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCart();
  }, []);

  return (
    <div>
      {cart ? (
        <div>
          {cart.products.map((item) => (
            <div key={item._id}>
              <h3>{item.product.name}</h3>
              <p>{item.product.price}</p>
              <p>{item.count}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;