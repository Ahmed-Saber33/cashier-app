import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";

const Modal = ({ product, setProduct, setShowModal, categories }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    price: "",
    quantity: "",
    category_id: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setData({
        name: product.name || "",
        price: product.price || "",
        quantity: product.quantity || "",
        category_id: product.category_id || "",
        image: null, 
      });
    } else {
      reset();
    }
  }, [product]);

  const handleFileChange = (e) => {
    setData("image", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const route = product && product.id ? `product/update/${product.id}` : "product/store";
  
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("category_id", data.category_id);
    if (data.image) {
      formData.append("image", data.image);
    }
  
    router.post(route, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onError: (err) => setLoading(false),
      onFinish: () => setLoading(false),
    });
  };
  

  return (
    <div className="add-product-modal">
      <div className="add-product-modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{product && product.id ? "Update Product" : "Add Product"}</h2>

          <label>Name
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              disabled={loading}
            />
            {errors.name && <div>{errors.name}</div>}
          </label>

          <label>Price
            <input
              type="number"
              value={data.price}
              onChange={(e) => setData("price", e.target.value)}
              disabled={loading}
            />
            {errors.price && <div>{errors.price}</div>}
          </label>

          <label>Quantity
            <input
              type="number"
              value={data.quantity}
              onChange={(e) => setData("quantity", e.target.value)}
              disabled={loading}
            />
            {errors.quantity && <div>{errors.quantity}</div>}
          </label>

          <label>Category
            <select
              value={data.category_id}
              onChange={(e) => setData("category_id", e.target.value)}
              disabled={loading}
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <div>{errors.category_id}</div>}
          </label>

          <label>Image
            <input
              type="file"
              onChange={handleFileChange}
              disabled={loading}
            />
            {errors.image && <div>{errors.image}</div>}
          </label>

          <button type="submit" disabled={processing || loading}>
            {processing || loading ? "Saving..." : "Save"}
          </button>
        </form>
        <button onClick={() => setShowModal(false)} disabled={loading}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
