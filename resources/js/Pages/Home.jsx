import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";

import ProductList from "./ProductList";
import Navbar from "./Navbar";
import Modal from "./Modal";
import CartModal from "./CartModal";
import "../../css/AllProducts.css";

const ProductManager = (props) => {
  const { products, categories } = props;
  
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [category, setCategories] = useState(categories);

  const handleOrder = () => {
    const orderData = {
      products: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    // إرسال الطلب إلى السيرفر
     router.post(route("orders.store"), orderData, {
      onSuccess: (response) => {
        setCart([]);
      },
      onError: (error) => {
        alert("Failed to place order. Please try again.");
      },
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const categoriesList = ["All", ...new Set(products.map((product) => product.category.name))];
  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || product.category.name === activeTab;
    return matchesQuery && matchesTab;
  });

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      Inertia.delete(`/products/${product.id}`);
    }
  };

  const openOptionsModal = (product) => {
    setSelectedProduct(product);
    setShowOptionsModal(true);
  };

  const closeOptionsModal = () => {
    setShowOptionsModal(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // تحديد المنتج الذي سيتم تعديله
    setShowModal(true); // فتح المودال
  };

  return (
    <div className="product-manager">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
        openCartModal={() => setShowCartModal(true)}
        openProductModal={() => setShowModal(true)}
      />
      <ProductList
        products={filteredProducts}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        cart={cart}
        setCart={setCart}
        categories={categoriesList} // تمرير الفئات المصفاة
        openOptionsModal={openOptionsModal}
        handleEditProduct={handleEditProduct} // تمرير الدالة
      />

      {showModal && (
        <Modal
          product={selectedProduct} // تمرير المنتج المحدد
          setProduct={setSelectedProduct}
          setShowModal={setShowModal}
          categories={category} // تمرير قائمة التصنيفات
        />
      )}

      {showOptionsModal && (
        <div className="options-modal">
          <div className="options-modal-content">
            <h3>Product Options</h3>
            <button onClick={() => handleEdit(selectedProduct)}>Update</button>
            <button onClick={() => handleDelete(selectedProduct)}>Delete</button>
            <button onClick={closeOptionsModal}>Close</button>
          </div>
        </div>
      )}

      <CartModal
        cart={cart}
        handleOrder={handleOrder}
        showCartModal={showCartModal}
        closeCartModal={closeCartModal}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default ProductManager;
