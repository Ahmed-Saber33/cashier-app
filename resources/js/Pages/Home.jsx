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
    id: 4,
    name: "Product D",
    price: 15,
    quantity: 12,
    category: "Category 3",
    image: "https://via.placeholder.com/150",
  },
  {
  id: 5,
  name: "Product F",
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

  // const addToCart = (product) => {
  //   const existing = cart.find((item) => item.id === product.id);
  //   if (existing) {
  //     setCart(
  //       cart.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       )
  //     );
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  // };

  // const removeFromCart = (id) => {
  //   setCart(cart.filter((item) => item.id !== id));
  // };

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

    // const [cart, setCart] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null); // Initialize hoveredProduct state

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
      const existing = cart.find((item) => item.id === id);
      if (existing?.quantity === 1) {
        setCart(cart.filter((item) => item.id !== id)); // Remove from cart if quantity is 1
      } else {
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    };

    const getCartQuantity = (id) => {
      const product = cart.find((item) => item.id === id);
      return product ? product.quantity : 0;
    };


  return (
      <div className="product-manager">
          {/* Navbar */}
          <nav className="navbar">
              <div className="navbar-left">
                  <div className="logo">
                      <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                      >
                          <path d="M20 15.628c0-.713-.154-1.919-1.191-1.98-.493-.03-.89-.414-.936-.904-.055-.581-.186-1.184-.476-1.744h-10.793c-.29.56-.421 1.163-.476 1.743-.046.49-.443.874-.936.904-1.037.062-1.192 1.268-1.192 1.981 0 .316.333 1.613 1.331 1.963.284.1.508.322.61.605.966 2.694 3.628 4.804 6.059 4.804 2.552 0 5.195-2.499 6.063-4.834.108-.29.344-.515.641-.606 1.07-.332 1.296-1.68 1.296-1.932zm-13-7.229v1.601h3v-1.5c0-.276.224-.5.5-.5s.5.224.5.5v1.5h2v-1.5c0-.276.225-.5.5-.5s.5.224.5.5v1.5h3v-1.647c.244-.058 3-.439 3-3.068 0-1.994-1.753-3.58-3.875-3.58-.806 0-1.278.198-1.941.428-1.137-1.123-1.63-1.133-2.184-1.133-.482 0-1.038.002-2.184 1.133-.68-.235-1.134-.428-1.941-.428-2.122 0-3.875 1.586-3.875 3.58 0 2.456 2.662 3.013 3 3.114zm14 7.229c0 .67-.453 2.407-2 2.887-1.023 2.754-3.999 5.485-7 5.485s-5.957-2.557-7-5.466c-1.52-.532-2-2.301-2-2.906 0-1.509.603-2.888 2.132-2.979.098-1.038.412-1.855.868-2.528v-.977c-1.825-.546-3-2.239-3-3.859 0-2.528 2.185-4.58 4.875-4.58.591 0 1.157.099 1.681.28.615-.607 1.483-.985 2.444-.985.961 0 1.828.378 2.443.985.525-.181 1.091-.28 1.682-.28 2.69 0 4.875 2.052 4.875 4.58 0 1.62-1.229 3.442-3 3.859v.976c.456.675.771 1.492.868 2.529 1.527.091 2.132 1.462 2.132 2.979zm-9 1.688c-1.9-1.287-1.351 1.854-4 .566.4 1.78 2.805 2.082 4 1.009 1.195 1.073 3.6.771 4-1.009-2.648 1.289-2.1-1.852-4-.566zm3-4.316c-.552 0-1 .525-1 1.174 0 .647.448 1.174 1 1.174s1-.527 1-1.174c0-.649-.448-1.174-1-1.174zm-5 1.174c0 .647-.448 1.174-1 1.174s-1-.527-1-1.174c0-.649.448-1.174 1-1.174s1 .525 1 1.174z" />
                      </svg>
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
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                      >
                          <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
                      </svg>
                      <span className="cart-count">{cart.length}</span>
                  </button>
                  <button
                      className="add-product-btn"
                      onClick={() => openProductModal()}
                  >
                      Add Product
                  </button>
              </div>
          </nav>

          {/* Dish Type Tabs */}
          <div className="dish-type-tabs">
              {[
                  "All",
                  "Breakfast",
                  "Soups",
                  "Pasta",
                  "Main Course",
                  "Burgers",
              ].map((tab) => (
                  <button
                      key={tab}
                      className={`dish-tab ${
                          activeTab === tab ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(tab)}
                  >
                      <div className="tab-content">
                          <span className="tab-title">{tab}</span>
                          <br />
                          <span className="tab-count">
                              {Math.floor(Math.random() * 20) + 5} Items
                          </span>
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
                              <img
                                  src={product.image}
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
                                  <p className="product-price">
                                      ${product.price}
                                  </p>
                                  <span
                                      className={
                                          product.isVeg
                                              ? "veg-label"
                                              : "non-veg-label"
                                      }
                                  >
                                      {product.isVeg ? "Veg" : "Non Veg"}
                                  </span>
                              </div>
                          </div>
                          <div className="product-details">
                              <button
                                  className="add-to-cart-btn"
                                  onMouseEnter={() =>
                                      setHoveredProduct(product.id)
                                  }
                                  onMouseLeave={() => setHoveredProduct(null)}
                              >
                                  {hoveredProduct === product.id ? (
                                      <div className="quantity-selector">
                                          <button
                                              className="quantity-btn"
                                              onClick={() =>
                                                  removeFromCart(product.id)
                                              }
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
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Add Product Modal */}
          {showModal && (
              <div className="add-product-modal">
                  <div className="add-product-modal-content">
                      <form
                          className="addFormModalContent"
                          onSubmit={handleFormSubmit}
                          >
                          <h2>
                              {newProduct.id ? "Update Product" : "Add Product"}
                          </h2>
                          <label>
                              Name:
                              <input
                                  type="text"
                                  value={newProduct.name}
                                  onChange={(e) =>
                                      setNewProduct({
                                          ...newProduct,
                                          name: e.target.value,
                                      })
                                  }
                                  required
                              />
                          </label>
                          <label>
                              Price:
                              <input
                                  type="number"
                                  value={newProduct.price}
                                  onChange={(e) =>
                                      setNewProduct({
                                          ...newProduct,
                                          price: e.target.value,
                                      })
                                  }
                                  required
                              />
                          </label>
                          <label>
                              Quantity:
                              <input
                                  type="number"
                                  value={newProduct.quantity}
                                  onChange={(e) =>
                                      setNewProduct({
                                          ...newProduct,
                                          quantity: e.target.value,
                                      })
                                  }
                                  required
                              />
                          </label>
                          <label>
                              Category:
                              <input
                                  type="text"
                                  value={newProduct.category}
                                  onChange={(e) =>
                                      setNewProduct({
                                          ...newProduct,
                                          category: e.target.value,
                                      })
                                  }
                                  required
                              />
                          </label>
                          <label>
                              Image URL:
                              <input
                                  type="text"
                                  value={newProduct.image}
                                  onChange={(e) =>
                                      setNewProduct({
                                          ...newProduct,
                                          image: e.target.value,
                                      })
                                  }
                                  required
                              />
                          </label>
                          <button type="submit">
                              {newProduct.id ? "Update" : "Save"}
                          </button>
                          <button type="button" onClick={closeProductModal}>
                              Cancel
                          </button>
                      </form>
                  </div>
                  <div
                      className="add-product-modal-close"
                      onClick={closeProductModal}
                  >
                      &times;
                  </div>
              </div>
          )}

          {/* Cart Modal */}
          {showCartModal && (
              <div className="cart-modal">
                  <div className="cart-modal-content">
                      <button
                          className="cart-modal-close"
                          onClick={closeCartModal}
                      >
                          &times;
                      </button>
                      <h2>Cart</h2>
                      {cart.length > 0 ? (
                          <>
                              <ul>
                                  {cart.map((item) => (
                                      <li key={item.id} className="cart-item">
                                          <div>
                                              <img
                                                  src={item.image}
                                                  alt={item.name}
                                                  className="cart-item-image"
                                              />
                                              <p>{item.name}</p>
                                              <p>Quantity: {item.quantity}</p>
                                              <p>
                                                  Total: $
                                                  {item.price * item.quantity}
                                              </p>
                                          </div>
                                          <button
                                              onClick={() =>
                                                  removeFromCart(item.id)
                                              }
                                          >
                                              Remove
                                          </button>
                                      </li>
                                  ))}
                              </ul>
                              <div className="cart-modal-footer">
                                  <span className="total-price">
                                      Total: $
                                      {cart.reduce(
                                          (total, item) =>
                                              total +
                                              item.price * item.quantity,
                                          0
                                      )}
                                  </span>
                                  <button onClick={handleOrder}>
                                      Place Order
                                  </button>
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
