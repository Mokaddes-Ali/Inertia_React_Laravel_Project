import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = () => {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        number: "",
        address: "",
        pic: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/customer/submit");
    };

    return (
        <AuthenticatedLayout>
        <div className="mx-auto shadow-sm border-0 max-h-[480px] max-w-[950px] bg-white rounded-md overflow-hidden">
            <div className="bg-primary text-white flex justify-between items-center py-2 px-4">
                <h5 className="text-lg font-semibold mb-0">Add Customer</h5>
                <a href="/customer/show" className="btn btn-outline-light btn-sm text-sm px-3 py-1 border rounded">
                    View Customers
                </a>
            </div>

            <div className="px-6 py-4">
                <form id="customerForm" onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            required
                            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                                errors.name ? "border-red-500" : ""
                            }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                                errors.email ? "border-red-500" : ""
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Mobile Number Input */}
                    <div className="mb-4">
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                            Mobile
                        </label>
                        <input
                            type="text"
                            name="number"
                            id="number"
                            value={data.number}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            required
                            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                                errors.number ? "border-red-500" : ""
                            }`}
                        />
                        {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                    </div>

                    {/* Address Input */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={data.address}
                            onChange={handleChange}
                            placeholder="Address City"
                            required
                            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                                errors.address ? "border-red-500" : ""
                            }`}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    {/* Image Input */}
                    <div className="mb-4">
                        <label htmlFor="pic" className="block text-sm font-medium text-gray-700">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            name="pic"
                            id="pic"
                            onChange={handleChange}
                            required
                            className={`mt-1 block w-full text-sm text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                                errors.pic ? "border-red-500" : ""
                            }`}
                        />
                        {errors.pic && <p className="text-red-500 text-sm">{errors.pic}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>


        </AuthenticatedLayout>
    );
}


export default Create;
