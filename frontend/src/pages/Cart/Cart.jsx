import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div key={index} className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>
                    <span className="font-bold">{item.price}</span> Birr
                  </p>
                  <p>{cartItems[item._id]}</p>
                  <p>
                    <span className="font-bold">
                      {item.price * cartItems[item._id]}
                    </span>{" "}
                    Birr
                  </p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    ❌
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>
                <span className="font-bold">{getTotalCartAmount()}</span> Birr
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>
                <span className="font-bold">
                  {getTotalCartAmount() === 0 ? 0 : 2}
                </span>{" "}
                Birr
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <span>
                <b>
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>{" "}
                Birr
              </span>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      <p className="text-center mt-6 text-gray-700 font-bold underline">
        Please Create Account or Sign In before proceeding to Checkout
      </p>
    </div>
  );
};

export default Cart;
