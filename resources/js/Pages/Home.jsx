import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react"; // Hook for accessing Inertia page props
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import Modal from "./Modal";
import CartModal from "./CartModal";
import "../../css/AllProducts.css";

const ProductManager = () => {
  const { products } = usePage().props; // Getting products data from Inertia
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });
  const [activeTab, setActiveTab] = useState("All");

  const handleOrder = () => {
    alert("Order placed successfully!");
    setCart([]);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      />
      {showModal && (
        <Modal
          product={newProduct}
          setProduct={setNewProduct}
          setShowModal={setShowModal}
          setProducts={setProducts}
        />
      )}
      {showCartModal && <CartModal cart={cart} handleOrder={handleOrder} />}
    </div>
  );
};

export default ProductManager;
