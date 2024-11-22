import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ errors }) {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        number: '',
        address: '',
        pic: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/customer/submit', {
            onFinish: () => {
                // handle success or redirect here if needed
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Post</h2>}>
        <div className="max-w-3xl mx-auto shadow-sm border-0">
            <div className="card-header bg-blue-600 text-white flex justify-between items-center py-2 px-4">
                <h5 className="mb-0">Add Customer</h5>
                <a href="/customer/show" className="btn btn-outline-light btn-sm">View Customers</a>
            </div>

            <div className="card-body px-4 py-3">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="form-input w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="form-input w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>

                    {/* Mobile Number Input */}
                    <div className="mb-4">
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            value={data.number}
                            onChange={(e) => setData('number', e.target.value)}
                            className="form-input w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.number && <div className="text-red-500 text-xs mt-1">{errors.number}</div>}
                    </div>

                    {/* Address Input */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="form-input w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
                    </div>

                    {/* Profile Image Input */}
                    <div className="mb-4">
                        <label htmlFor="pic" className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            id="pic"
                            name="pic"
                            onChange={(e) => setData('pic', e.target.files[0])}
                            className="form-input w-full mt-1"
                            required
                        />
                        {errors.pic && <div className="text-red-500 text-xs mt-1">{errors.pic}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-green-600 text-white rounded-md ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={processing}
                        >
                            {processing ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        </AuthenticatedLayout>
    );
}
