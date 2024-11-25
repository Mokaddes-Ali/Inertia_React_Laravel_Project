// import React, { useState } from "react";

// const Edit = ({ customers, products }) => {
//   const [cart, setCart] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [paymentModal, setPaymentModal] = useState(false);
//   const [amountReceived, setAmountReceived] = useState(0);
//   const [paymentResult, setPaymentResult] = useState("");

//   const taxRate = 0.1;

//   const addToCart = (productName, price, productId) => {
//     const updatedCart = [...cart];
//     const item = updatedCart.find((i) => i.name === productName);
//     if (item) {
//       item.quantity += 1;
//     } else {
//       updatedCart.push({ name: productName, price, quantity: 1, product_id: productId });
//     }
//     updateCart(updatedCart);
//   };

//   const updateCart = (updatedCart) => {
//     let updatedSubtotal = 0;
//     updatedCart.forEach((item) => {
//       updatedSubtotal += item.price * item.quantity;
//     });
//     setCart(updatedCart);
//     setSubtotal(updatedSubtotal);
//   };

//   const updateQuantity = (productName, change) => {
//     const updatedCart = [...cart];
//     const item = updatedCart.find((i) => i.name === productName);
//     if (item) {
//       item.quantity += change;
//       if (item.quantity <= 0) {
//         removeFromCart(productName);
//       } else {
//         updateCart(updatedCart);
//       }
//     }
//   };

//   const removeFromCart = (productName) => {
//     const updatedCart = cart.filter((i) => i.name !== productName);
//     updateCart(updatedCart);
//   };

//   const selectCustomer = (customerName, address, phone, id) => {
//     setSelectedCustomer({ name: customerName, address, phone, id });
//   };

//   const openPaymentModal = () => {
//     setPaymentModal(true);
//   };

//   const closePaymentModal = () => {
//     setPaymentModal(false);
//   };

//   const processPayment = () => {
//     const total = subtotal + subtotal * taxRate;
//     const paymentAmount = parseFloat(amountReceived);
//     if (isNaN(paymentAmount) || paymentAmount <= 0) {
//       setPaymentResult("Please enter a valid amount.");
//     } else if (paymentAmount >= total) {
//       const change = paymentAmount - total;
//       setPaymentResult(`Payment successful! Change Due: $${change.toFixed(2)}`);
//     } else {
//       const due = total - paymentAmount;
//       setPaymentResult(`Payment incomplete! Due Amount: $${due.toFixed(2)}`);
//     }
//   };

//   const submitInvoice = () => {
//     if (!selectedCustomer || cart.length === 0) {
//       alert("Please select a customer and add items to the cart.");
//       return;
//     }
//     // Add API submission logic here
//   };

//   return (
//     <div className="container flex justify-between p-5 mt-10 bg-gray-100">
//       {paymentModal && (
//         <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="modal-content bg-red-100 p-6 rounded-md w-80 text-center">
//             <h5>Please Receive Payment</h5>
//             <button
//               className="close bg-blue-500 p-2 rounded text-white"
//               onClick={closePaymentModal}
//             >
//               &times;
//             </button>
//             <div className="modal-body mt-4">
//               <label className="font-bold">Total Amount:</label>
//               <h4>${(subtotal + subtotal * taxRate).toFixed(2)}</h4>
//               <input
//                 type="number"
//                 className="w-full p-2 my-3 border border-blue-500 rounded"
//                 placeholder="Enter amount received"
//                 value={amountReceived}
//                 onChange={(e) => setAmountReceived(e.target.value)}
//               />
//               <div className="paymentResult">{paymentResult}</div>
//             </div>
//             <div className="modal-footer mt-4">
//               <button
//                 className="bg-green-500 text-white px-6 py-2 rounded"
//                 onClick={processPayment}
//               >
//                 Paid
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-6 py-2 rounded ml-2"
//                 onClick={closePaymentModal}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Summary */}
//       <div className="cart-summary bg-white p-5 rounded-lg shadow-md border border-gray-300 w-1/3">
//         <h2 className="text-xl font-semibold">Cart</h2>
//         <div className="cart-customer mt-2">
//         <p className="heading-cart text-red-600">
//             {selectedCustomer
//               ? `Customer: ${selectedCustomer.name}, Address: ${selectedCustomer.address}, Phone: ${selectedCustomer.phone}`
//               : "No customer selected"}
//           </p>
//         </div>

//         {/* Cart Items */}
//         <div className="cart-items mt-4">
//           {cart.map((item, index) => (
//             <div key={index} className="cart-item flex justify-between items-center p-3 my-2 bg-gray-200 rounded-md shadow-sm">
//               <span>{item.name} - ${item.price}</span>
//               <div className="qty-controls flex gap-2">
//                 <button
//                   className="bg-blue-500 p-2 rounded text-white"
//                   onClick={() => updateQuantity(item.name, -1)}
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   className="bg-blue-500 p-2 rounded text-white"
//                   onClick={() => updateQuantity(item.name, 1)}
//                 >
//                   +
//                 </button>
//               </div>
//               <button
//                 className="bg-red-500 text-white p-2 rounded"
//                 onClick={() => removeFromCart(item.name)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="summary mt-4">
//           <span className="block">
//             Subtotal: ${subtotal.toFixed(2)}
//           </span>
//           <span className="block">
//             Taxes: ${(subtotal * taxRate).toFixed(2)}
//           </span>
//           <strong className="block mt-2">
//             Total: ${(subtotal + subtotal * taxRate).toFixed(2)}
//           </strong>
//           <button
//             className="bg-green-500 text-white py-2 px-6 rounded mt-4"
//             onClick={openPaymentModal}
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>

//       {/* Customer Section */}
//       <div className="w-full md:w-1/4 bg-white p-5 rounded shadow">
//         <h2 className="text-xl font-semibold">Select Customer</h2>
//         <table className="w-full table-auto">
//           <thead>
//             <tr>
//               <th className="text-left">Customer</th>
//               <th className="text-left">Pick</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer) => (
//               <tr key={customer.id}>
//                 <td>{customer.name}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       setSelectedCustomer({
//                         id: customer.id,
//                         name: customer.name,
//                         address: customer.address,
//                         phone: customer.phone,
//                       })
//                     }
//                     className="bg-blue-500 text-white p-2 rounded"
//                   >
//                     Select
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Product List */}
//       <div className="w-full md:w-1/4 bg-white p-5 rounded shadow">
//         <h2 className="text-xl font-semibold">Select Product</h2>
//         <table className="w-full table-auto">
//           <thead>
//             <tr>
//               <th className="text-left">Product</th>
//               <th className="text-left">Pick</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.name}</td>
//                 <td>
//                   <button
//                     onClick={() => addToCart(product.name, product.price, product.id)}
//                     className="bg-green-500 text-white p-2 rounded"
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Edit;


import React, { useState } from "react";

const Edit = ({ customers, products }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [amountReceived, setAmountReceived] = useState(0);
  const [paymentResult, setPaymentResult] = useState("");
  const [taxRate] = useState(0.1); // Assuming the tax rate is 10%

  const addToCart = (productName, price, productId) => {
    const updatedCart = [...cart];
    const item = updatedCart.find((i) => i.name === productName);
    if (item) {
      item.quantity += 1;
    } else {
      updatedCart.push({ name: productName, price, quantity: 1, product_id: productId });
    }
    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    let updatedSubtotal = 0;
    updatedCart.forEach((item) => {
      updatedSubtotal += item.price * item.quantity;
    });
    setCart(updatedCart);
    setSubtotal(updatedSubtotal);
  };

  const updateQuantity = (productName, change) => {
    const updatedCart = [...cart];
    const item = updatedCart.find((i) => i.name === productName);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        removeFromCart(productName);
      } else {
        updateCart(updatedCart);
      }
    }
  };

  const removeFromCart = (productName) => {
    const updatedCart = cart.filter((i) => i.name !== productName);
    updateCart(updatedCart);
  };

  const selectCustomer = (customerName, address, phone, id) => {
    setSelectedCustomer({ name: customerName, address, phone, id });
  };

  const openPaymentModal = () => {
    setPaymentModal(true);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const processPayment = () => {
    const total = subtotal + subtotal * taxRate;
    const paymentAmount = parseFloat(amountReceived);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setPaymentResult("Please enter a valid amount.");
    } else if (paymentAmount >= total) {
      const change = paymentAmount - total;
      setPaymentResult(`Payment successful! Change Due: $${change.toFixed(2)}`);
    } else {
      const due = total - paymentAmount;
      setPaymentResult(`Payment incomplete! Due Amount: $${due.toFixed(2)}`);
    }
  };

  // Submit invoice to the server
  const submitInvoice = async () => {
    const total = subtotal + subtotal * taxRate;
    const paid = parseFloat(amountReceived);
    const taxes = subtotal * taxRate;
    const CID = selectedCustomer ? selectedCustomer.id : null; // Use selected customer ID
    const due = total - paid;

    if (!selectedCustomer || cart.length === 0) {
      alert("Please select a customer and add items to the cart.");
      return;
    }

    const invoiceData = {
      customer_id: CID,
      total: total,
      paid: paid,
      due: due,
      vat: taxes,
      items: cart.map((item) => ({
        product_id: item.product_id,
        qty: item.quantity,
        price: item.price,
      })),
    };

    try {
      let response = await fetch("/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        },
        body: JSON.stringify(invoiceData),
      });

      let result = await response.json();
      if (response.ok) {
        alert(result.message);
        setCart([]); // Reset the cart
        updateCart([]);
        closePaymentModal();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container flex justify-between p-5 mt-10 bg-gray-100">
      {/* Payment Modal */}
      {paymentModal && (
        <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-red-100 p-6 rounded-md w-80 text-center">
            <h5>Please Receive Payment</h5>
            <button
              className="close bg-blue-500 p-2 rounded text-white"
              onClick={closePaymentModal}
            >
              &times;
            </button>
            <div className="modal-body mt-4">
              <label className="font-bold">Total Amount:</label>
              <h4>${(subtotal + subtotal * taxRate).toFixed(2)}</h4>
              <input
                type="number"
                className="w-full p-2 my-3 border border-blue-500 rounded"
                placeholder="Enter amount received"
                value={amountReceived}
                onChange={(e) => setAmountReceived(e.target.value)}
              />
              <div className="paymentResult">{paymentResult}</div>
            </div>
            <div className="modal-footer mt-4">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded"
                onClick={processPayment}
              >
                Paid
              </button>
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded ml-2"
                onClick={closePaymentModal}
              >
                Close
              </button>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-6 mt-4 rounded"
              onClick={submitInvoice}
            >
              Submit Invoice
            </button>
          </div>
        </div>
      )}

      {/* Cart Summary */}
      <div className="cart-summary bg-white p-5 rounded-lg shadow-md border border-gray-300 w-1/3">
        <h2 className="text-xl font-semibold">Cart</h2>
        <div className="cart-customer mt-2">
          <p className="heading-cart text-red-600">
            {selectedCustomer
              ? `Customer: ${selectedCustomer.name}, Address: ${selectedCustomer.address}, Phone: ${selectedCustomer.phone}`
              : "No customer selected"}
          </p>
        </div>

        {/* Cart Items */}
        <div className="cart-items mt-4">
          {cart.map((item, index) => (
            <div key={index} className="cart-item flex justify-between items-center p-3 my-2 bg-gray-200 rounded-md shadow-sm">
              <span>{item.name} - ${item.price}</span>
              <div className="qty-controls flex gap-2">
                <button
                  className="bg-blue-500 p-2 rounded text-white"
                  onClick={() => updateQuantity(item.name, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-blue-500 p-2 rounded text-white"
                  onClick={() => updateQuantity(item.name, 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => removeFromCart(item.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="summary mt-4">
          <span className="block">
            Subtotal: ${subtotal.toFixed(2)}
          </span>
          <span className="block">
            Taxes: ${(subtotal * taxRate).toFixed(2)}
          </span>
          <strong className="block mt-2">
            Total: ${(subtotal + subtotal * taxRate).toFixed(2)}
          </strong>
          <button
            className="bg-green-500 text-white py-2 px-6 rounded mt-4"
            onClick={openPaymentModal}
          >
            Proceed to Payment
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
                      selectCustomer(
                        customer.name,
                        customer.address,
                        customer.phone,
                        customer.id
                      )
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

      {/* Product Section */}
      <div className="product-list w-full md:w-1/3 bg-white p-5 rounded shadow">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="product-grid grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-gray-200 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>${product.price}</p>
              <button
                onClick={() => addToCart(product.name, product.price, product.id)}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Edit;

