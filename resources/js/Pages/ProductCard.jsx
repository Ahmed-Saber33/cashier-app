import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const ProductCard = ({ product, cart, setCart }) => {
  const { delete: destroy } = useForm();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      destroy(route("products.destroy", product.id)); // Send DELETE request
    }
  };

  return (
    <div className="product-card">
      {/* Displaying product details */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.category.name}</p>
        <p>{product.price}</p>
      </div>

      <div className="product-actions">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
