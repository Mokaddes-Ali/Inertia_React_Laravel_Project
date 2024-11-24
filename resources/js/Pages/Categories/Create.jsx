import React from "react";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        remarks: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/categories", {
            onSuccess: () => reset(), // সফল হলে ইনপুট রিসেট হবে।
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Category</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block font-medium">Name:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                {/* Remarks Field */}
                <div>
                    <label className="block font-medium">Remarks:</label>
                    <textarea
                        value={data.remarks}
                        onChange={(e) => setData("remarks", e.target.value)}
                        className="border rounded p-2 w-full"
                    ></textarea>
                    {errors.remarks && (
                        <span className="text-red-500 text-sm">{errors.remarks}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    );
}
