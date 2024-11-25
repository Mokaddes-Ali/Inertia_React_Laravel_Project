import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { AiOutlineReload } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Create = () => {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        email: "",
        number: "",
        address: "",
        pic: null,
    });

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setData(name, files[0]);
            setPreview(URL.createObjectURL(files[0])); // Image preview
        } else {
            setData(name, value);
        }
    };

    const handleReset = () => {
        reset();
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            post("/customer/submit", {
                onSuccess: () => {
                    toast.success("Customer added successfully!");
                    reset();
                    setPreview(null);
                },
                onError: (error) => {
                    if (error.email) {
                        toast.error("Email already exists!");
                    } else {
                        toast.error("An error occurred. Please try again.");
                    }
                },
            });
        } catch (err) {
            toast.error("An unexpected error occurred!");
        }
    };


    return (
        <AuthenticatedLayout>
            <div className="mx-auto mt-11 max-w-5xl bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary text-white flex justify-between items-center py-3 px-6 rounded-t-lg">
                    <h5 className="text-lg font-semibold">Add Customer</h5>
                    <a
                        href="/customers/show"
                        className="relative flex items-center px-4 py-2 border border-black bg-fuchsia-200 text-sm text-black hover:shadow-md transition duration-200 rounded-full transform hover:scale-105"
                    >
                        <span>View Customers</span>
                        <span class="relative flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                    </a>
                </div>

                <div className="flex flex-col md:flex-row p-2 gap-6">
                    {/* Form Section */}
                    <div className="flex-1 bg-white rounded-lg p-6 ">
                        <form
                            id="customerForm"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            {/* Name Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Mobile Number Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="number"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                {errors.number && (
                                    <p className="text-red-500 text-sm">
                                        {errors.number}
                                    </p>
                                )}
                            </div>

                            {/* Address Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                {errors.address && (
                                    <p className="text-red-500 text-sm">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Image Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="pic"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                {errors.pic && (
                                    <p className="text-red-500 text-sm">
                                        {errors.pic}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-2">
                                <button
                                    type="reset"
                                    onClick={handleReset}
                                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300"
                                >
                                    <AiOutlineReload /> Reset
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                                >
                                    <MdSend className="animate-bounce w-6 h-6" />{" "}
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Image Preview Section */}
                    <div className="flex-1 flex justify-center items-center border rounded-md p-4 bg-gray-100">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-96 object-cover rounded shadow-md"
                            />
                        ) : (
                            <p className="text-gray-500 text-2xl text-red-600">
                                No image selected
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer />
        </AuthenticatedLayout>
    );
};

export default Create;
