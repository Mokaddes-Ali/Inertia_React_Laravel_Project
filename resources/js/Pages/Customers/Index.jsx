import React from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ customers }) => {
    // Delete action handler
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this customer?")) {
            Inertia.delete(`/customers/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customer List
                </h2>
            }
        >
            <div className="container mx-auto px-2 ">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Id</th>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Image</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Number</th>
                            <th className="py-2 px-4 border">Address</th>
                            <th className="py-2 px-4 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-4 border">
                                    {customer.name}
                                </td>
                                <td className="py-2 px-4 border">
                                    <img
                                        src={`/images/${customer.pic}`}
                                        alt={customer.name}
                                        className="rounded-full border border-gray-300 w-12 h-12 object-cover"
                                    />
                                </td>

                                <td className="py-2 px-4 border">
                                    {customer.email}
                                </td>

                                <td className="py-2 px-4 border">
                                    {customer.number || "N/A"}
                                </td>
                                <td className="py-2 px-4 border">
                                    {customer.address || "N/A"}
                                </td>
                                <td className="py-2 px-4 border flex gap-2">
                                    <button
                                        onClick={() =>
                                            Inertia.get(
                                                `/customers/${customer.id}/edit`
                                            )
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(customer.id)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
