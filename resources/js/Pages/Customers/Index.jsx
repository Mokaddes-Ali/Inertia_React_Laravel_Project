import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Index({ customers }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            {flash.success && <div className="text-green-500 mb-4">{flash.success}</div>}
            <Link
                href="/customers/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Customer
            </Link>
            <table className="table-auto w-full mt-4 border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td className="border px-4 py-2">{customer.name}</td>
                            <td className="border px-4 py-2">{customer.email}</td>
                            <td className="border px-4 py-2">{customer.address || "N/A"}</td>
                            <td className="border px-4 py-2">
                                {customer.pic && (
                                    <img
                                        src={`/storage/${customer.pic}`}
                                        alt={customer.name}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                )}
                            </td>
                            <td className="border px-4 py-2 flex gap-2">
                                <Link
                                    href={`/customers/${customer.id}/edit`}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <form
                                    method="POST"
                                    action={`/customers/${customer.id}`}
                                    onSubmit={(e) => !confirm("Are you sure?") && e.preventDefault()}
                                >
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <button
                                        type="submit"
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
