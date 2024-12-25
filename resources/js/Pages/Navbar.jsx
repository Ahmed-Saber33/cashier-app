import React from "react";

const Navbar = ({ searchQuery, setSearchQuery, cart, openCartModal, openProductModal }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <span>CHILI POS</span>
        </div>
        <button className="menu-toggle">
          <i className="fa fa-bars"></i>
        </button>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Product here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="navbar-right">
        <button className="cart-icon" onClick={openCartModal}>
          <span className="cart-count">{cart.length}</span>
        </button>
        <button className="add-product-btn" onClick={openProductModal}>
          Add Product
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
