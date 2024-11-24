// // import React, { useState } from 'react';
// // import { Inertia } from '@inertiajs/inertia';
// // import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// // const Edit = ({ customer }) => {
// //     const [values, setValues] = useState({
// //         name: customer.name,
// //         email: customer.email,
// //         number: customer.number || '',
// //         address: customer.address || '',
// //         status: customer.status,
// //         pic: null, // ইমেজ ফাইলের জন্য
// //     });

// //     const handleChange = (e) => {
// //         const { name, value, files } = e.target;
// //         if (name === "pic") {
// //             setValues({ ...values, pic: files[0] }); // ফাইল ইনপুট ফিল্ড হ্যান্ডেল করা
// //         } else {
// //             setValues({ ...values, [name]: value });
// //         }
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         const formData = new FormData();
// //         formData.append("name", values.name);
// //         formData.append("email", values.email);
// //         formData.append("number", values.number);
// //         formData.append("address", values.address);
// //         formData.append("status", values.status);
// //         if (values.pic) {
// //             formData.append("pic", values.pic); // ইমেজ যোগ করা
// //         }

// //         Inertia.put(`/customers/${customer.id}`, formData, {
// //             onSuccess: () => alert('Customer updated successfully!'),
// //             onError: (errors) => {
// //                 console.error(errors);  // ত্রুটি লগ করুন
// //                 alert('Error updating customer!');
// //             }
// //         });

// //     };


// //     return (
// //         <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Customer</h2>}>
// //             <div className="container mx-auto px-4 py-6">
// //                 <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
// //                 <form onSubmit={handleSubmit} method="post" className="space-y-4">

// //                     <input
// //                         type="text"
// //                         name="name"
// //                         value={values.name}
// //                         onChange={handleChange}
// //                         placeholder="Name"
// //                         className="w-full border px-4 py-2"
// //                     />
// //                     <input
// //                         type="email"
// //                         name="email"
// //                         value={values.email}
// //                         onChange={handleChange}
// //                         placeholder="Email"
// //                         className="w-full border px-4 py-2"
// //                     />
// //                     <input
// //                         type="text"
// //                         name="number"
// //                         value={values.number}
// //                         onChange={handleChange}
// //                         placeholder="Number"
// //                         className="w-full border px-4 py-2"
// //                     />
// //                     <input
// //                         type="text"
// //                         name="address"
// //                         value={values.address}
// //                         onChange={handleChange}
// //                         placeholder="Address"
// //                         className="w-full border px-4 py-2"
// //                     />

// //                     {/* ইমেজ ফাইল ইনপুট */}
// //                     <input
// //                         type="file"
// //                         name="pic"
// //                         onChange={handleChange}
// //                         className="w-full border px-4 py-2"
// //                     />
// //                     {customer.pic && (
// //                         <div>
// //                             <p>Existing Image:</p>
// //                             <img
// //     src={`/images/${customer.pic}`}
// //     alt={customer.name}
// //     className="w-24 h-24 object-cover rounded"
// // />

// //                         </div>
// //                     )}
// //                     <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
// //                         Update
// //                     </button>
// //                 </form>
// //             </div>
// //         </AuthenticatedLayout>
// //     );
// // };

// // export default Edit;

// import React, { useState } from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// const Edit = ({ customer }) => {
//     const [values, setValues] = useState({
//         name: customer.name,
//         email: customer.email,
//         number: customer.number || '',
//         address: customer.address || '',
//         status: customer.status,
//         pic: null, // ইমেজ ফাইলের জন্য
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "pic") {
//             setValues({ ...values, pic: files[0] }); // ফাইল ইনপুট হ্যান্ডেল করা
//         } else {
//             setValues({ ...values, [name]: value });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", values.name);
//         formData.append("email", values.email);
//         formData.append("number", values.number);
//         formData.append("address", values.address);
//         formData.append("status", values.status);
//         if (values.pic) {
//             formData.append("pic", values.pic); // ফাইল আপলোড করা
//         }

//         Inertia.put(`/customers/${customer.id}`, formData, {
//             onSuccess: () => alert('Customer updated successfully!'),
//             onError: (errors) => console.log(errors),
//         });
//     };

//     return (
//         <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Customer</h2>}>
//             <div className="container mx-auto px-4 py-6">
//                 <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
//                 <form onSubmit={handleSubmit} method="post" className="space-y-4">

//                     <input
//                         type="text"
//                         name="name"
//                         value={values.name}
//                         onChange={handleChange}
//                         placeholder="Name"
//                         className="w-full border px-4 py-2"
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         value={values.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                         className="w-full border px-4 py-2"
//                     />
//                     <input
//                         type="text"
//                         name="number"
//                         value={values.number}
//                         onChange={handleChange}
//                         placeholder="Number"
//                         className="w-full border px-4 py-2"
//                     />
//                     <input
//                         type="text"
//                         name="address"
//                         value={values.address}
//                         onChange={handleChange}
//                         placeholder="Address"
//                         className="w-full border px-4 py-2"
//                     />

//                     {/* ইমেজ ফাইল ইনপুট */}
//                     <input
//                         type="file"
//                         name="pic"
//                         onChange={handleChange}
//                         className="w-full border px-4 py-2"
//                     />
//                     {customer.pic && (
//                         <div>
//                             <p>Existing Image:</p>
//                             <img
//                                 src={`/images/${customer.pic}`}
//                                 alt={customer.name}
//                                 className="w-24 h-24 object-cover rounded"
//                             />
//                         </div>
//                     )}

//                     <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//                         Update
//                     </button>
//                 </form>
//             </div>
//         </AuthenticatedLayout>
//     );
// };

// export default Edit;



import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Edit({ customer }) {
    const { data, setData, post, processing, errors } = useForm({
        name: customer.name || '',
        email: customer.email || '',
        number: customer.number || '',
        address: customer.address || '',
        pic: null, // for the image file
    });

    const handleFileChange = (e) => {
        setData('pic', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('customer.update', customer.id), {
            onFinish: () => console.log('Form submitted successfully!'),
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Edit Customer</h2>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                        <input
                            type="text"
                            value={data.number}
                            onChange={(e) => setData('number', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.number && <div className="text-red-500 text-xs">{errors.number}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Address</label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.address && <div className="text-red-500 text-xs">{errors.address}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Profile Picture</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.pic && <div className="text-red-500 text-xs">{errors.pic}</div>}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-3 rounded-md disabled:bg-gray-400"
                        >
                            {processing ? 'Updating...' : 'Update Customer'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
