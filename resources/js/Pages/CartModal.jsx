import React from "react";

const CartModal = ({ cart, handleOrder, showCartModal, closeCartModal, removeFromCart }) => {
  return (
    showCartModal && (
      <div className="cart-modal">
        <div className="cart-modal-content">
          <button className="cart-modal-close" onClick={closeCartModal}>
            &times;
          </button>
          <h2>Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <p>{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: ${item.price * item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-modal-footer">
                <span className="total-price">
                  Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                </span>
                <button onClick={handleOrder}>Place Order</button>
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
    )
  );
};

export default CartModal;
