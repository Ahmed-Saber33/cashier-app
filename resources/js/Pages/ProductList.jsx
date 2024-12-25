import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, activeTab, handleTabClick, cart, setCart }) => {
  return (
    <div className="dish-type-tabs">
      {["All", "Breakfast", "Soups", "Pasta", "Main Course", "Burgers"].map((tab) => (
        <button
          key={tab}
          className={`dish-tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          <span className="tab-title">{tab}</span>
        </button>
      ))}

      <div className="product-container">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
