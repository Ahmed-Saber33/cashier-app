import React from "react";

const CartModal = ({ cart, handleOrder }) => {
  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <h3>Your Cart</h3>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <button onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CartModal;
