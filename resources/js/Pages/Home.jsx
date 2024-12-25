import React, { useState } from "react";
import "../../css/AllProducts.css"; // Import the CSS file

const ProductManager = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      price: 10,
      quantity: 5,
      category: "Category 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product B",
      price: 20,
      quantity: 8,
      category: "Category 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product C",
      price: 15,
      quantity: 12,
      category: "Category 3",
      image: "https://via.placeholder.com/150",
    },
    {
    id: 3,
    name: "Product C",
    price: 15,
    quantity: 12,
    category: "Category 3",
    image: "https://via.placeholder.com/150",
  },
  {
  id: 3,
  name: "Product C",
  price: 15,
  quantity: 12,
  category: "Category 3",
  image: "https://via.placeholder.com/150",
}
  ]);

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
  const [showMenu, setShowMenu] = useState(null); // For managing which product menu to show

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // Add logic to filter products based on the selected category
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleOrder = () => {
    alert("Order placed successfully!");
    setCart([]);
  };

  const openProductModal = () => {
    setNewProduct({ id: null, name: "", price: "", quantity: "", category: "", image: "" });
    setShowModal(true);
  };

  const closeProductModal = () => {
    setShowModal(false);
  };

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { id, name, price, quantity, category, image } = newProduct;

    if (id) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { id, name, price: parseFloat(price), quantity: parseInt(quantity, 10), category, image }
            : product
        )
      );
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          id: Date.now(),
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity, 10),
          category,
          image,
        },
      ]);
    }
    closeProductModal();
  };

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setShowMenu(null);
  };

  const openUpdateModal = (product) => {
    setNewProduct(product);
    setShowModal(true);
    setShowMenu(null);
  };

  return (
    <div className="product-manager">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
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
          />
        </div>
        <div className="navbar-right">
          <button className="cart-icon" onClick={openCartModal}>
            <i className="fa fa-shopping-cart"></i>
            <span className="cart-count">{cart.length}</span>
          </button>
          <button className="add-product-btn" onClick={() => openProductModal()}>
            Add Product
          </button>
        </div>
      </nav>

      {/* Dish Type Tabs */}
      <div className="dish-type-tabs">
        {["All", "Breakfast", "Soups", "Pasta", "Main Course", "Burgers"].map((tab) => (
          <button
            key={tab}
            className={`dish-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            <div className="tab-content">
              <span className="tab-title">{tab}</span><br/>
              <span className="tab-count">{Math.floor(Math.random() * 20) + 5} Items</span>
            </div>
          </button>
        ))}
      </div>

    {/* Product Cards */}
<div className="product-container">
  <div className="product-grid">
    {filteredProducts.map((product) => (
      <div key={product.id} className="product-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          {product.discount && <span className="discount-badge">{product.discount}% Off</span>}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
          <div className="product-label">
            <span className={product.isVeg ? "veg-label" : "non-veg-label"}>
              {product.isVeg ? "Veg" : "Non Veg"}
            </span>
          </div>
        </div>
        <div className="product-actions">
          <button className="three-dots-btn" onClick={() => toggleMenu(product.id)}>
            ⋮
          </button>
          {showMenu === product.id && (
            <div className="action-menu">
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => openUpdateModal(product)}>Update</button>
            </div>
          )}
        </div>
        <div className="product-details">
          <div className="quantity-selector">
            <button className="quantity-btn" onClick={() => decreaseQuantity(product.id)}>-</button>
            <span className="quantity">{product.quantity}</span>
            <button className="quantity-btn" onClick={() => increaseQuantity(product.id)}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            Add to Dish
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="add-product-modal">
          <div className="add-product-modal-content">
            <h2>{newProduct.id ? 'Update Product' : 'Add Product'}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  required
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  required
                />
              </label>
              <button type="submit">{newProduct.id ? 'Update' : 'Save'}</button>
              <button type="button" onClick={closeProductModal}>
                Cancel
              </button>
            </form>
          </div>
          <div className="add-product-modal-close" onClick={closeProductModal}>&times;</div>
        </div>
      )}
    
  

      {/* Cart Modal */}
      {showCartModal && (
        <div className="cart-modal">
          <div className="cart-modal-content">
            <button className="cart-modal-close" onClick={closeCartModal}>&times;</button>
            <h2>Cart</h2>
            {cart.length > 0 ? (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div>
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ${item.price * item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <div className="cart-modal-footer">
                  <span className="total-price">
                    Total: $
                    {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                  </span>
                  <button onClick={handleOrder}>Place Order</button>
                </div>
              </>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
