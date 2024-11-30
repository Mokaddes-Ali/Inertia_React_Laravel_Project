import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ categories }) => {
    const handleDelete = (id) => {
        if (confirm("Are You Sure Delete!")) {
            Inertia.get(`/delete/category/${id}`);
        }
    };

    return (
        <>
        <AuthenticatedLayout>
        <div className="container mx-auto mt-10">
            <div className="flex flex-col">
                <div className="w-full">
                    {/* Panel Header */}
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-md">
                        <Link
                            href="/category"
                            className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            <i className="fa fa-plus-circle mr-2"></i> Add New
                        </Link>
                    </div>

                    {/* Panel Body */}
                    <div className="bg-white rounded-b-md shadow-md">
                        <table className="w-full text-left border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">
                                        ID
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Name
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Remarks
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Status
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="odd:bg-gray-100 even:bg-white"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">
                                            {category.id}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {category.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {category.remarks}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {category.status
                                                ? "Active"
                                                : "Inactive"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <ul className="flex gap-2">
                                                {/* Edit Button */}
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            (window.location.href = `/category/edit/${category.id}`)
                                                        }
                                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </li>

                                                {/* Delete Button */}
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                category.id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
        </>
    );
};

export default Index;
