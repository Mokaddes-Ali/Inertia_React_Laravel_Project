import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Edit = ({ record }) => {
    const { data, setData, post, errors } = useForm({
        id: record.id,
        name: record.name || "",
        email: record.email || "",
        number: record.number || "",
        address: record.address || "",
        pic: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/customer/update");
    };

    return (
        <>
            <AuthenticatedLayout>
                <div className="bg-white shadow-md rounded-lg mt-8 p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">

                        <h3 className="text-xl font-bold">Customer Edit</h3>
                        <Link href="/customers/show">
                            <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                                Back To List
                            </button>
                        </Link>
                    </div>

                    {/* Form and Image Section */}
                    <div className="flex flex-wrap md:flex-nowrap gap-6">
                        {/* Left Form Section */}
                        <div className="w-full md:w-1/2">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Name Input */}
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="Enter Name"
                                        required
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                {/* Email Input */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        placeholder="Enter Email"
                                        required
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                {/* Mobile Number Input */}
                                <div className="mb-4">
                                    <label htmlFor="number" className="block text-sm font-medium mb-2">
                                        Mobile
                                    </label>
                                    <input
                                        type="number"
                                        id="number"
                                        name="number"
                                        value={data.number}
                                        onChange={(e) => setData("number", e.target.value)}
                                        placeholder="Enter Mobile Number"
                                        required
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                                </div>

                                {/* Address Input */}
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        placeholder="Enter Address"
                                        required
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                </div>

                                {/* Image Input */}
                                <div className="mb-4">
                                    <label htmlFor="pic" className="block text-sm font-medium mb-2">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        id="pic"
                                        name="pic"
                                        onChange={(e) => setData("pic", e.target.files[0])}
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 ml-96 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </form>
                        </div>

                        {/* Right Image Section */}
                        <div className="w-full md:w-1/2 flex items-center justify-center">
                            {record.pic ? (
                                <img
                                    src={`/images/${record.pic}`}
                                    alt="Customer"
                                    className="w-96 h-96 rounded-lg object-cover shadow-md"
                                />
                            ) : (
                                <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                                    <p className="text-gray-500 text-sm">No Image Available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Edit;
