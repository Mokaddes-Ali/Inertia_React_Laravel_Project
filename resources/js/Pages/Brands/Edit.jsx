import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const { brand } = usePage().props;
    const { data, setData, put, errors } = useForm({
        brandName: brand.brandName || "",
        brandImg: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("brands.update", brand.id));
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Edit Brand</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="brandName" className="block font-medium mb-1">
                        Brand Name:
                    </label>
                    <input
                        type="text"
                        id="brandName"
                        value={data.brandName}
                        onChange={(e) => setData("brandName", e.target.value)}
                        className="w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-orange-500"
                    />
                    {errors.brandName && (
                        <span className="text-red-500 text-sm">{errors.brandName}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="brandImg" className="block font-medium mb-1">
                        Brand Image:
                    </label>
                    <input
                        type="file"
                        id="brandImg"
                        onChange={(e) => setData("brandImg", e.target.files[0])}
                        className="w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-orange-500"
                    />
                    {errors.brandImg && (
                        <span className="text-red-500 text-sm">{errors.brandImg}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                >
                    Update Brand
                </button>
            </form>
        </div>
    );
}
