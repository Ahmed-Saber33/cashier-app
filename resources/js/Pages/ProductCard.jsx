import React from "react";
import  { useState } from "react";
import { Inertia } from '@inertiajs/inertia'; // Import Inertia from '@inertiajs/inertia'
import { useForm,  } from "@inertiajs/inertia-react";


const ProductCard = ({ product, cart, setCart, handleEditProduct }) => {
  const { delete: destroy } = useForm();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  

  
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      Inertia.delete(route("products.destroy", { product: id }), {
        onSuccess: () => {
          alert("Product deleted successfully");
        },
        onError: (error) => {
          alert("Failed to delete product");
        },
      });
    }
  };
// Helper functions for cart operations
const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);
    if (existingItem) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prevCart, { ...product, quantity: 1 }];
  });
};

const removeFromCart = (productId) => {
  setCart((prevCart) => {
    return prevCart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
  });
};

const getCartQuantity = (productId) => {
  const item = cart.find((item) => item.id === productId);
  return item ? item.quantity : 0;
};
// const handleEditProduct = (product) => {
//   console.log("Editing product:", product); // للتحقق من القيم
//   setEditingProduct(product);
//   setModalVisible(true);
// };

  return (
    <div key={product.id} className="product-card">
    <div className="product-image-container">
    <img
  src={product.image ? `/storage/${product.image}` : '/path-to-default-image.jpg'}
  alt={product.name}
  className="product-image"
    />
      {product.discount && (
        <span className="discount-badge">
          {product.discount}% Off
        </span>
      )}
    </div>
    <div className="product-info">
      <h3 className="product-name">{product.name}</h3>
      <div className="price-and-label">
        <p className="product-price">${product.price}</p>
        <span
          className={
            product.isVeg ? "veg-label" : "non-veg-label"
          }
        >
          {product.isVeg ? "Veg" : "Non Veg"}
        </span>
      </div>
    </div>
    <div className="product-details">
      <button
        className="add-to-cart-btn"
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        {hoveredProduct === product.id ? (
          <div className="quantity-selector">
            <button
              className="quantity-btn"
              onClick={() => removeFromCart(product.id)}
            >
              -
            </button>
            <span className="quantity">
              {getCartQuantity(product.id)}
            </span>
            <button
              className="quantity-btn"
              onClick={() => addToCart(product)}
            >
              +
            </button>
          </div>
        ) : (
          "Add to Dish"
        )}
      </button>
      <button
        className="action-menu "
        onClick={() => setShowOptions((prev) => !prev)}
        >
        ⋮ {/* Three dots icon */}
      </button>
     {/* Options Menu */}
     {showOptions && (
          <div className="action-menu ">
           <button
              className="options-btn"
              onClick={() => {
                handleEditProduct(product); // تحديث المنتج المحدد
                setShowOptions(false); // إغلاق القائمة
              }}
            >
              Update
            </button>

            <button
              className="options-btn delete"
              onClick={() => {
                handleDelete(product);
                setShowOptions(false); // Close the menu
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;