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
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/customers/${customer.id}`, values);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Customer</h2>}>
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    className="w-full border px-4 py-2"
                >
                    <option value="0">Inactive</option>
                    <option value="1">Active</option>
                </select>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>

        </AuthenticatedLayout>
    );
};

export default Edit;
