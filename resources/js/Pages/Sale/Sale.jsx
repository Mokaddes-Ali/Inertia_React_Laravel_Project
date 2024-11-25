import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Sale({ customers, products }) {
    const [cart, setCart] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [amountReceived, setAmountReceived] = useState("");

    // Add product to the cart
    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.product_id === product.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.product_id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Update cart quantity
    const updateQuantity = (productId, change) => {
        setCart(
            cart.map((item) =>
                item.product_id === productId
                    ? { ...item, quantity: Math.max(item.quantity + change, 0) }
                    : item
            )
        );
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product_id !== productId));
    };

    // Handle payment submission
    const processPayment = () => {
        const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const paidAmount = parseFloat(amountReceived);
        if (paidAmount >= totalAmount) {
            Inertia.post("/process-payment", {
                customer_id: selectedCustomer.id,
                cart: cart,
                paid: paidAmount,
                total: totalAmount,
            });
        } else {
            alert("Insufficient amount");
        }
    };

    return (
        <div className="flex flex-wrap justify-between p-5">
            {/* Cart Summary */}
            <div className="w-full md:w-2/5 bg-white p-5 rounded shadow">
                <h2 className="text-xl font-semibold">Cart</h2>
                {selectedCustomer ? (
                    <div>
                        <p>Customer: {selectedCustomer.name}</p>
                        <p>Address: {selectedCustomer.address}</p>
                        <p>Phone: {selectedCustomer.phone}</p>
                    </div>
                ) : (
                    <p>No customer selected</p>
                )}

                <div>
                    {cart.map((item) => (
                        <div key={item.product_id} className="flex justify-between items-center">
                            <span>{item.name} - ${item.price}</span>
                            <div className="flex gap-2">
                                <button onClick={() => updateQuantity(item.product_id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product_id, 1)}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <strong>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</strong>
                </div>
                <div className="mt-4">
                    <input
                        type="number"
                        value={amountReceived}
                        onChange={(e) => setAmountReceived(e.target.value)}
                        placeholder="Enter amount received"
                        className="w-full p-2 border rounded"
                    />
                    <button onClick={processPayment} className="bg-green-500 text-white p-2 rounded mt-2 w-full">
                        Process Payment
                    </button>
                </div>
            </div>

            {/* Customer Section */}
            <div className="w-full md:w-1/4 bg-white p-5 rounded shadow">
                <h2 className="text-xl font-semibold">Select Customer</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="text-left">Customer</th>
                            <th className="text-left">Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            setSelectedCustomer({
                                                id: customer.id,
                                                name: customer.name,
                                                address: customer.address,
                                                phone: customer.phone,
                                            })
                                        }
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Product List */}
            <div className="w-full md:w-1/4 bg-white p-5 rounded shadow">
                <h2 className="text-xl font-semibold">Select Product</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="text-left">Product</th>
                            <th className="text-left">Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-green-500 text-white p-2 rounded"
                                    >
                                        Add
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



