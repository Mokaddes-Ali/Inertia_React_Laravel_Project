// import React, { useState, useEffect } from 'react';
// import { Inertia } from '@inertiajs/inertia';

// const Sale = ({ customers, products }) => {
//     const [cart, setCart] = useState([]);
//     const [subtotal, setSubtotal] = useState(0);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const taxRate = 0.1;

//     useEffect(() => {
//         updateCart();
//     }, [cart]);

//     const addToCart = (productName, price, productId) => {
//         const item = cart.find(i => i.name === productName);
//         if (item) {
//             item.quantity += 1;
//         } else {
//             setCart([...cart, { name: productName, price: price, quantity: 1, product_id: productId }]);
//         }
//     };

//     const updateCart = () => {
//         let newSubtotal = 0;
//         cart.forEach(item => {
//             newSubtotal += item.price * item.quantity;
//         });
//         setSubtotal(newSubtotal);
//     };

//     const updateQuantity = (productName, change) => {
//         const newCart = cart.map(item => {
//             if (item.name === productName) {
//                 item.quantity += change;
//                 if (item.quantity <= 0) {
//                     return null;
//                 }
//             }
//             return item;
//         }).filter(item => item !== null);
//         setCart(newCart);
//     };

//     const removeFromCart = (productName) => {
//         setCart(cart.filter(i => i.name !== productName));
//     };

//     const selectCustomer = (customer) => {
//         setSelectedCustomer(customer);
//     };

//     const openPaymentModal = () => {
//         document.getElementById('paymentModal').style.display = 'flex';
//     };

//     const closePaymentModal = () => {
//         document.getElementById('paymentModal').style.display = 'none';
//     };

//     const processPayment = () => {
//         const total = subtotal + (subtotal * taxRate);
//         const amountReceived = parseFloat(document.getElementById('amountReceived').value);
//         const paymentResultDiv = document.getElementById('paymentResult');

//         if (isNaN(amountReceived) || amountReceived <= 0) {
//             paymentResultDiv.innerText = 'Please enter a valid amount.';
//             return;
//         }

//         if (amountReceived >= total) {
//             const change = amountReceived - total;
//             paymentResultDiv.innerText = `Payment successful! Change Due: $${change.toFixed(2)}`;
//             submitInvoice();
//         } else {
//             const due = total - amountReceived;
//             paymentResultDiv.innerText = `Payment incomplete! Due Amount: $${due.toFixed(2)}`;
//             submitInvoice();
//         }
//     };

//     const submitInvoice = async () => {
//         const total = subtotal + (subtotal * taxRate);
//         const paid = parseFloat(document.getElementById('amountReceived').value);
//         const taxes = subtotal * taxRate;
//         const due = total - paid;

//         if (!selectedCustomer || cart.length === 0) {
//             alert('Please select a customer and add items to the cart.');
//             return;
//         }

//         const invoiceData = {
//             customer_id: selectedCustomer.id,
//             total: total,
//             paid: paid,
//             due: due,
//             vat: taxes,
//             items: cart.map(item => ({
//                 product_id: item.product_id,
//                 qty: item.quantity,
//                 price: item.price
//             }))
//         };

//         try {
//             await Inertia.post('/invoices', invoiceData);
//             setCart([]);
//             updateCart();
//             closePaymentModal();
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <div className="flex justify-between">
//                 <div className="cart-summary bg-white p-4 rounded shadow-md w-1/3">
//                     <h2 className="text-xl mb-4">Cart</h2>
//                     <div id="cart-customer">
//                         <p className="text-red-500">No customer selected for this cart.</p>
//                     </div>
//                     <div id="cart-items">
//                         {cart.map(item => (
//                             <div key={item.name} className="cart-item flex justify-between items-center mb-2 p-2 bg-gray-100 rounded shadow">
//                                 <span>{item.name} - ${item.price}</span>
//                                 <div className="qty-controls flex items-center">
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => updateQuantity(item.name, -1)}>-</button>
//                                     <span className="mx-2">{item.quantity}</span>
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => updateQuantity(item.name, 1)}>+</button>
//                                 </div>
//                                 <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(item.name)}>Remove</button>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="summary mt-4">
//                         <span>Subtotal: ${subtotal.toFixed(2)}</span><br />
//                         <span>Taxes: ${(subtotal * taxRate).toFixed(2)}</span><br />
//                         <strong>Total: ${(subtotal + (subtotal * taxRate)).toFixed(2)}</strong><br /><br />
//                         <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={openPaymentModal}>Proceed to Payment</button>
//                     </div>
//                 </div>

//                 <div className="customer-section bg-white p-4 rounded shadow-md w-1/4">
//                     <table className="table-auto w-full">
//                         <thead>
//                             <tr>
//                                 <th>Customer</th>
//                                 <th>Pick</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {customers.map(customer => (
//                                 <tr key={customer.id}>
//                                     <td>{customer.name}</td>
//                                     <td><button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => selectCustomer(customer)}>ADD</button></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="product-list bg-white p-4 rounded shadow-md w-1/3">
//                     <table className="table-auto w-full">
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Pick</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {products.map(product => (
//                                 <tr key={product.id}>
//                                     <td>{product.name}</td>
//                                     <td><button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => addToCart(product.name, product.price, product.id)}>ADD</button></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             <div id="paymentModal" className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="modal-content bg-white p-4 rounded shadow-md w-96">
//                     <div className="modal-header flex justify-between items-center">
//                         <h5 className="text-xl">Please Receive Payment</h5>
//                         <button className="close bg-red-500 text-white px-2 py-1 rounded" onClick={closePaymentModal}>&times;</button>
//                     </div>
//                     <div className="modal-body mt-4">
//                         <label className="font-bold">Total Amount:</label>
//                         <h4 className="text-2xl">$<span id="modal-total">{(subtotal + (subtotal * taxRate)).toFixed(2)}</span></h4>
//                         <input type="number" id="amountReceived" className="w-full p-2 mt-2 border rounded" placeholder="Enter amount received" />
//                         <div id="paymentResult" className="mt-2"></div>
//                     </div>
//                     <div className="modal-footer mt-4 flex justify-end">
//                         <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={processPayment}>Paid</button>
//                         <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closePaymentModal}>Close</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sale;





// import React, { useState, useEffect } from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// const Sale = ({ customers, products }) => {
//     const [cart, setCart] = useState([]);
//     const [subtotal, setSubtotal] = useState(0);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const taxRate = 0.1;

//     useEffect(() => {
//         updateCart();
//     }, [cart]);

//     const addToCart = (productName, price, productId) => {
//         const item = cart.find(i => i.name === productName);
//         if (item) {
//             item.quantity += 1;
//         } else {
//             setCart([...cart, { name: productName, price: price, quantity: 1, product_id: productId }]);
//         }
//     };

//     const updateCart = () => {
//         let newSubtotal = 0;
//         cart.forEach(item => {
//             newSubtotal += item.price * item.quantity;
//         });
//         setSubtotal(newSubtotal);
//     };

//     const updateQuantity = (productName, change) => {
//         const newCart = cart.map(item => {
//             if (item.name === productName) {
//                 item.quantity += change;
//                 if (item.quantity <= 0) {
//                     return null;
//                 }
//             }
//             return item;
//         }).filter(item => item !== null);
//         setCart(newCart);
//     };

//     const removeFromCart = (productName) => {
//         setCart(cart.filter(i => i.name !== productName));
//     };

//     const selectCustomer = (customer) => {
//         setSelectedCustomer(customer); // গ্রাহক সেভ করুন
//     };

//     const openPaymentModal = () => {
//         document.getElementById('paymentModal').style.display = 'flex';
//     };

//     const closePaymentModal = () => {
//         document.getElementById('paymentModal').style.display = 'none';
//     };

//     const processPayment = () => {
//         const total = subtotal + (subtotal * taxRate);
//         const amountReceived = parseFloat(document.getElementById('amountReceived').value);
//         const paymentResultDiv = document.getElementById('paymentResult');

//         if (isNaN(amountReceived) || amountReceived <= 0) {
//             paymentResultDiv.innerText = 'Please enter a valid amount.';
//             return;
//         }

//         if (amountReceived >= total) {
//             const change = amountReceived - total;
//             paymentResultDiv.innerText = `Payment successful! Change Due: $${change.toFixed(2)}`;
//             submitInvoice();
//         } else {
//             const due = total - amountReceived;
//             paymentResultDiv.innerText = `Payment incomplete! Due Amount: $${due.toFixed(2)}`;
//             submitInvoice();
//         }
//     };

//     const submitInvoice = async () => {
//         const total = subtotal + (subtotal * taxRate);
//         const paid = parseFloat(document.getElementById('amountReceived').value);
//         const taxes = subtotal * taxRate;
//         const due = total - paid;

//         if (!selectedCustomer || cart.length === 0) {
//             alert('Please select a customer and add items to the cart.');
//             return;
//         }

//         const invoiceData = {
//             customer_id: selectedCustomer.id,
//             total: total,
//             paid: paid,
//             due: due,
//             vat: taxes,
//             items: cart.map(item => ({
//                 product_id: item.product_id,
//                 qty: item.quantity,
//                 price: item.price
//             }))
//         };

//         try {
//             await Inertia.post('/invoices', invoiceData);
//             setCart([]);
//             updateCart();
//             closePaymentModal();
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <>
//         <AuthenticatedLayout>
//         <div className="container mx-auto p-4">
//             <div className="flex justify-between">
//                 {/* Cart Section */}
//                 <div className="cart-summary bg-white p-4 rounded shadow-md w-1/3">
//                     <h2 className="text-xl mb-4">Cart</h2>
//                     <div id="cart-customer">
//                         {selectedCustomer ? (
//                             <p className="text-green-500">Selected Customer: {selectedCustomer.name} <br/>  Customer Address: {selectedCustomer.address}
//                             <br/> Customer Mobile: {selectedCustomer.number} <br/>  (ID: {selectedCustomer.id})</p>
//                         ) : (
//                             <p className="text-red-500">No customer selected for this cart.</p>
//                         )}
//                     </div>
//                     <div id="cart-items">
//                         {cart.map(item => (
//                             <div key={item.name} className="cart-item flex justify-between items-center mb-2 p-2 bg-gray-100 rounded shadow">
//                                 <span>{item.name} - ${item.price}</span>
//                                 <div className="qty-controls flex items-center">
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => updateQuantity(item.name, -1)}>-</button>
//                                     <span className="mx-2">{item.quantity}</span>
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => updateQuantity(item.name, 1)}>+</button>
//                                 </div>
//                                 <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(item.name)}>Remove</button>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="summary mt-4">
//                         <span>Subtotal: ${subtotal.toFixed(2)}</span><br />
//                         <span>Taxes: ${(subtotal * taxRate).toFixed(2)}</span><br />
//                         <strong>Total: ${(subtotal + (subtotal * taxRate)).toFixed(2)}</strong><br /><br />
//                         <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={openPaymentModal}>Proceed to Payment</button>
//                     </div>
//                 </div>

//                 {/* Customer Section */}
//                 <div className="customer-section bg-white p-4 rounded shadow-md w-1/4">
//                     <table className="table-auto w-full">
//                         <thead>
//                             <tr>
//                                 <th>Customer</th>
//                                 <th>Pick</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {customers.map(customer => (
//                                 <tr key={customer.id}>
//                                     <td>{customer.name}</td>

//                                     <td><button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => selectCustomer(customer)}>ADD</button></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Product List Section */}
//                 <div className="product-list bg-white p-4 rounded shadow-md w-1/3">
//                     <table className="table-auto w-full">
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Pick</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {products.map(product => (
//                                 <tr key={product.id}>
//                                     <td>{product.name}</td>
//                                     <td><button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => addToCart(product.name, product.price, product.id)}>ADD</button></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Payment Modal */}
//             <div id="paymentModal" className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="modal-content bg-white p-4 rounded shadow-md w-96">
//                     <div className="modal-header flex justify-between items-center">
//                         <h5 className="text-xl">Please Receive Payment</h5>
//                         <button className="close bg-red-500 text-white px-2 py-1 rounded" onClick={closePaymentModal}>&times;</button>
//                     </div>
//                     <div className="modal-body mt-4">
//                         <label className="font-bold">Total Amount:</label>
//                         <h4 className="text-2xl">$<span id="modal-total">{(subtotal + (subtotal * taxRate)).toFixed(2)}</span></h4>
//                         <input type="number" id="amountReceived" className="w-full p-2 mt-2 border rounded" placeholder="Enter amount received" />
//                         <div id="paymentResult" className="mt-2"></div>
//                     </div>
//                     <div className="modal-footer mt-4 flex justify-end">
//                         <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={processPayment}>Paid</button>
//                         <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closePaymentModal}>Close</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </AuthenticatedLayout>
//         </>
//     );
// };

// export default Sale;


import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sale = ({ customers, products }) => {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const taxRate = 0.1;

    useEffect(() => {
        updateCart();
    }, [cart]);

    const notify = (message, type = "success") => {
        toast[type](message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const addToCart = (productName, price, productId) => {
        const item = cart.find(i => i.name === productName);
        if (item) {
            item.quantity += 1;
        } else {
            setCart([...cart, { name: productName, price: price, quantity: 1, product_id: productId }]);
        }
        notify(`Added ${productName} to cart`);
    };

    const updateCart = () => {
        let newSubtotal = 0;
        cart.forEach(item => {
            newSubtotal += item.price * item.quantity;
        });
        setSubtotal(newSubtotal);
    };

    const updateQuantity = (productName, change) => {
        const newCart = cart.map(item => {
            if (item.name === productName) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    notify(`Removed ${productName} from cart`, "info");
                    return null;
                }
            }
            return item;
        }).filter(item => item !== null);
        setCart(newCart);
    };

    const removeFromCart = (productName) => {
        setCart(cart.filter(i => i.name !== productName));
        notify(`Removed ${productName} from cart`, "info");
    };

    const selectCustomer = (customer) => {
        setSelectedCustomer(customer);
        notify(`Selected customer: ${customer.name}`);
    };

    const processPayment = () => {
        const total = subtotal + (subtotal * taxRate);
        const amountReceived = parseFloat(document.getElementById('amountReceived').value);

        if (isNaN(amountReceived) || amountReceived <= 0) {
            notify("Please enter a valid amount", "error");
            return;
        }

        if (amountReceived >= total) {
            const change = amountReceived - total;
            notify(`Payment successful! Change Due: $${change.toFixed(2)}`);
            submitInvoice();
        } else {
            const due = total - amountReceived;
            notify(`Payment incomplete! Due Amount: $${due.toFixed(2)}`, "warning");
            submitInvoice();
        }
    };

    const submitInvoice = async () => {
        const total = subtotal + (subtotal * taxRate);
        const paid = parseFloat(document.getElementById('amountReceived').value);
        const taxes = subtotal * taxRate;
        const due = total - paid;

        if (!selectedCustomer || cart.length === 0) {
            notify('Please select a customer and add items to the cart.', "error");
            return;
        }

        const invoiceData = {
            customer_id: selectedCustomer.id,
            total: total,
            paid: paid,
            due: due,
            vat: taxes,
            items: cart.map(item => ({
                product_id: item.product_id,
                qty: item.quantity,
                price: item.price
            }))
        };

        try {
            await Inertia.post('/invoices', invoiceData);
            setCart([]);
            updateCart();
            notify('Invoice submitted successfully!', 'success');
    setIsModalOpen(false); // ডাটা সাবমিট হলে মডাল বন্ধ করুন
        } catch (error) {
            notify('Error processing invoice.', "error");
        }
    };

    return (
        <>
            <AuthenticatedLayout>
                <div className="container mx-auto mt-10 p-4">
                    {/* Toast Container */}
                    <ToastContainer />

                    <div className="flex justify-between">
                        {/* Cart Section */}
                        <div className="cart-summary bg-white p-4 rounded shadow-md w-1/3">
                            <h2 className="text-xl mb-4">Cart</h2>
                            {/* <div id="cart-customer">
                       {selectedCustomer ? (
                           <p className="text-green-500">Selected Customer: {selectedCustomer.name} <br/>  Customer Address: {selectedCustomer.address}                           <br/> Customer Mobile: {selectedCustomer.number} <br/>  (ID: {selectedCustomer.id})</p>
                       ) : (
                          <p className="text-red-500">No customer selected for this cart.</p>
                      )}
                    </div> */}

<div id="cart-customer">
  {selectedCustomer ? (
    <div>
      <p className="text-green-500">
        Selected Customer: {selectedCustomer.name} <br />
        Customer Address: {selectedCustomer.address} <br />
        Customer Mobile: {selectedCustomer.number} <br />
        (ID: {selectedCustomer.id})
      </p>
      {/* Image from public folder */}
      <p>Customer Image:<img
        src={`/images/${selectedCustomer.pic}`} // Image path from database
        alt={`${selectedCustomer.name}'s avatar`}
        className="w-16 h-16 rounded-full mt-2"
      />
      </p>

    </div>
  ) : (
    <p className="text-red-500">No customer selected for this cart.</p>
  )}
</div>

                            <div id="cart-items">
                                {cart.map(item => (
                                    <div key={item.name} className="cart-item flex justify-between items-center mb-2 p-2 bg-gray-100 rounded shadow">
                                        <span>{item.name} - ${item.price}</span>
                                        <div className="qty-controls flex items-center">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => updateQuantity(item.name, -1)}>-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => updateQuantity(item.name, 1)}>+</button>
                                        </div>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(item.name)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                            <div className="summary mt-4">
                                <span>Subtotal: ${subtotal.toFixed(2)}</span><br />
                                <span>Taxes: ${(subtotal * taxRate).toFixed(2)}</span><br />
                                <strong>Total: ${(subtotal + (subtotal * taxRate)).toFixed(2)}</strong><br /><br />
                                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>Proceed to Payment</button>
                            </div>
                        </div>

                        {/* Customer Section */}
                        <div className="customer-section bg-white p-4 rounded shadow-md w-1/4">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Pick</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map(customer => (
                                        <tr key={customer.id}>
                                            <td>{customer.name}</td>
                                            <td><button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => selectCustomer(customer)}>ADD</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Product List Section */}
                        <div className="product-list bg-white p-4 rounded shadow-md w-1/3">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Pick</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td><button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => addToCart(product.name, product.price, product.id)}>ADD</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Modal */}
                    {isModalOpen && (
                        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="modal-content bg-white p-4 rounded shadow-md w-96">
                                <div className="modal-header flex justify-between items-center">
                                    <h5 className="text-xl">Please Receive Payment</h5>
                                    <button className="close bg-red-500 text-white px-2 py-1 rounded" onClick={() => setIsModalOpen(false)}>&times;</button>
                                </div>
                                <div className="modal-body mt-4">
                                    <label className="font-bold">Total Amount:</label>
                                    <h4 className="text-2xl">${(subtotal + (subtotal * taxRate)).toFixed(2)}</h4>
                                    <input type="number" id="amountReceived" className="w-full p-2 mt-2 border rounded" placeholder="Enter amount received" />
                                </div>
                                <div className="modal-footer mt-4 flex justify-end">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={processPayment}>Paid</button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Sale;
