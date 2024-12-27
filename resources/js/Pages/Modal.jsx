import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";

const Modal = ({ product, setProduct, setShowModal, categories }) => {
  const { data, setData, post, put, processing, errors } = useForm({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    category_id: product.category_id,
    image: product.image,
  });

  useEffect(() => {
    setData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category_id: product.category_id,
      image: product.image,
    });
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.id) {
      put(route("products.update", product.id)); // تحديث المنتج
    } else {
      post(route("products.store")); // إضافة المنتج
    }
  };

  return (
    <div className="add-product-modal">
      <div className="add-product-modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{product.id ? "Update Product" : "Add Product"}</h2>
          <label>Name
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && <div>{errors.name}</div>}
          </label>

          <label>Price
            <input
              type="number"
              value={data.price}
              onChange={(e) => setData("price", e.target.value)}
            />
            {errors.price && <div>{errors.price}</div>}
          </label>

          <label>Quantity
            <input
              type="number"
              value={data.quantity}
              onChange={(e) => setData("quantity", e.target.value)}
            />
            {errors.quantity && <div>{errors.quantity}</div>}
          </label>

          <label>Category
  <select
    value={data.category_id}
    onChange={(e) => setData("category_id", e.target.value)}
  >
    <option value="">Select a category</option>
    {categories && categories.length > 0 ? (
      categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))
    ) : (
      <option value="">No categories available</option>
    )}
  </select>
  {errors.category_id && <div>{errors.category_id}</div>}
</label>


          <label>Image
            <input
              type="text"
              value={data.image}
              onChange={(e) => setData("image", e.target.value)}
            />
            {errors.image && <div>{errors.image}</div>}
          </label>

          <button type="submit" disabled={processing}>
            {processing ? "Saving..." : "Save"}
          </button>
        </form>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
