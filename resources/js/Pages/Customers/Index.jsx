import React from "react";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ all }) => {
    return (
        <AuthenticatedLayout>
        <div className="bg-white shadow-md rounded-lg p-4">
            {/* Header Section */}
            <div className="flex items-center mb-4">
                <div className="mx-5 mt-2">
                    <Link href="/customer">
                        <button type="button" className="btn btn-success text-white py-2 px-4 rounded-lg">
                            Add Customer
                        </button>
                    </Link>
                </div>
                <div className="mx-5 mt-2 text-xl font-semibold">
                    List of Customer
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2">Id</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Number</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all.data.map((row) => (
                            <tr key={row.id} className="odd:bg-gray-100 even:bg-white">
                                <td className="px-4 py-2">{row.id}</td>
                                <td className="px-4 py-2">{row.name}</td>
                                <td className="px-4 py-2">{row.email}</td>
                                <td className="px-4 py-2">{row.number}</td>
                                <td className="px-4 py-2">{row.address}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={`/images/${row.pic}`}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-4 py-2 flex space-x-2">
    {/* Edit Button */}
    <Link
        href={`/customer/edit/${row.id}`}
        className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-600 transition"
    >
        Edit
    </Link>
    {/* View Button */}
    <Link
        href={`/customer/dataShow/${row.id}`}
        className="bg-teal-500 text-white py-1 px-2 rounded-md text-sm hover:bg-teal-600 transition"
    >
        View
    </Link>
    {/* Delete Button */}
    <button
        onClick={() =>
            confirm("Are You Sure Delete!") &&
            window.location.replace(`/delete/${row.id}`)
        }
        className="bg-red-500 text-white py-1 px-2 rounded-md text-sm hover:bg-red-600 transition"
    >
        Delete
    </button>
</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4">
                {all.links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 mx-1 rounded-lg ${
                            link.active ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></a>
                ))}
            </div>
        </div>


        </AuthenticatedLayout>
    );
};

export default Index;
