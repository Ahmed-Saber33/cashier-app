// ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, activeTab, handleTabClick, cart, setCart, categories, handleEditProduct }) => {
  const categoriesName = categories.name 
  console.log(categories);
  
  return (
    <>
    <div className="dish-type-tabs">
      {/* عرض أزرار الفئات */}
      {categories.map((tab, index) => (
          <button
            key={index}
            className={`dish-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            <span className="tab-title">{tab}</span> {/* عرض اسم الفئة فقط */}
          </button>
        ))}

      {/* عرض المنتجات */}
     
    </div>
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
             handleEditProduct={handleEditProduct} // تمرير دالة التعديل

           />
         ))
       )}
     </div>
   </div> 
   </>
  );
};

export default ProductList;
