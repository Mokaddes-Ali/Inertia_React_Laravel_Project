import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Edit({ category }) {
    const { put, errors } = useForm({
        name: category.name,
        remarks: category.remarks,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/categories/${category.id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div className="mt-2">
                    <label>Remarks:</label>
                    <textarea
                        value={data.remarks}
                        onChange={(e) => setData("remarks", e.target.value)}
                        className="border p-2 rounded w-full"
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Update
                </button>
            </form>
        </div>
    );
}
