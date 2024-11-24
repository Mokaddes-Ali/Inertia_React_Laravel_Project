import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Index({ categories }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            window.axios.delete(`/categories/${id}`).then(() => {
                window.location.reload();
            });
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            {flash.success && <div className="text-green-600">{flash.success}</div>}

            <Link
                href="/categories/create"
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
            >
                Add Category
            </Link>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Remarks</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.data.map((category, index) => (
                        <tr key={category.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{category.name}</td>
                            <td className="border px-4 py-2">{category.remarks}</td>
                            <td className="border px-4 py-2">
                                <Link
                                    href={`/categories/${category.id}/edit`}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
