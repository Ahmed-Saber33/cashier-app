// ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, activeTab, handleTabClick, cart, setCart }) => {
  // استخراج الفئات ديناميكيًا من المنتجات
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  return (
    <div className="dish-type-tabs">
      {/* عرض أزرار الفئات */}
      {categories.map((tab, index) => (
        <button
          key={index} // تأكد أن المفتاح فريد
          className={`dish-tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          <span className="tab-title">{tab.name}</span>
        </button>
      ))}

      {/* عرض المنتجات */}
      <div className="product-container">
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id} // تأكد أن المفتاح فريد لكل منتج
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
