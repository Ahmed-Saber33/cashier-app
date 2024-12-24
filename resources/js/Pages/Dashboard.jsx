import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../css/custom.css'
function Dashboard () {
    const [cart, setCart] = useState([]);

    const menuItems = [
        { id: 1, name: 'Tasty Vegetable Salad', price: 17.99, type: 'Veg' },
        { id: 2, name: 'Original Cheese Burger', price: 10.59, type: 'Non-Veg' },
        { id: 3, name: 'Tacos Salsa with Chicken', price: 14.99, type: 'Non-Veg' },
        { id: 4, name: 'Fresh Orange Juice', price: 12.99, type: 'Veg' },
    ];

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId));
    };

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="sidebar w-1/4 bg-white p-4 shadow-md">
                <h2 className="text-xl font-bold mb-6">Menu</h2>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className="menu-item p-4 mb-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition duration-200 cursor-pointer"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-md font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} - {item.type}</p>
                                </div>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                                    onClick={() => addToCart(item)}
                                >
                                    Add
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                <h2 className="text-xl font-bold mb-6">Cart</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <ul>
                        {cart.map((item, index) => (
                            <li
                                key={index}
                                className="cart-item p-4 mb-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition duration-200"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-md font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 text-right">
                        <h3 className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</h3>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Dashboard;