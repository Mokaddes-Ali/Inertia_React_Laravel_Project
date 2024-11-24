

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ customer }) => {
    const [values, setValues] = useState({
        name: customer.name,
        email: customer.email,
        number: customer.number || '',
        address: customer.address || '',
        status: customer.status,
        pic: null, // ইমেজ ফাইলের জন্য
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "pic") {
            setValues({ ...values, pic: files[0] }); // ফাইল ইনপুট হ্যান্ডেল করা
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("number", values.number);
        formData.append("address", values.address);
        formData.append("status", values.status);
        if (values.pic) {
            formData.append("pic", values.pic); // ফাইল আপলোড করা
        }

        Inertia.put(`/customers/${customer.id}`, formData, {
            onSuccess: () => alert('Customer updated successfully!'),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Customer</h2>}>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
                <form onSubmit={handleSubmit} method="post" className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border px-4 py-2"
                    />
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border px-4 py-2"
                    />
                    <input
                        type="text"
                        name="number"
                        value={values.number}
                        onChange={handleChange}
                        placeholder="Number"
                        className="w-full border px-4 py-2"
                    />
                    <input
                        type="text"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full border px-4 py-2"
                    />

                    {/* ইমেজ ফাইল ইনপুট */}
                    <input
                        type="file"
                        name="pic"
                        onChange={handleChange}
                        className="w-full border px-4 py-2"
                    />
                    {customer.pic && (
                        <div>
                            <p>Existing Image:</p>
                            <img
                                src={`/images/${customer.pic}`}
                                alt={customer.name}
                                className="w-24 h-24 object-cover rounded"
                            />
                        </div>
                    )}

                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        Update
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;

