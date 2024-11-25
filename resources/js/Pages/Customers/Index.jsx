import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ all }) => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(all.data);

    // Handle search input
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        // Filter rows based on name or email
        const filtered = all.data.filter(
            (row) =>
                row.name.toLowerCase().includes(value) ||
                row.email.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    // Reset search
    const resetSearch = () => {
        setSearch("");
        setFilteredData(all.data);
    };

    return (
        <AuthenticatedLayout>
            <div className="mt-10 rounded-lg">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-xl ml-[500px] mt-4 font-semibold">List of Customers</div>

                </div>

                {/* Search Section */}
                <div className="flex items-center mb-6 ml-8">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search by Name or Email"
                        className="px-4 py-2 w-80 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                    />
                    <button
                        onClick={resetSearch}
                        className="ml-4 px-6 py-2 rounded-md bg-gray-500 text-white font-bold transition duration-200 hover:bg-gray-600"
                    >
                        Reset
                    </button>
                    <Link href="/customers/add">
                        <button className="px-6 py-2 ml-96 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                            Add Customer
                        </button>
                    </Link>
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
                            {filteredData.map((row) => (
                                <tr
                                    key={row.id}
                                    className="odd:bg-gray-100 even:bg-white"
                                >
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
                                        <Link
                                            href={`/customer/edit/${row.id}`}
                                            className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </Link>
                                        {/* <Link
                                            href={`/customer/dataShow/${row.id}`}
                                            className="bg-teal-500 text-white py-1 px-2 rounded-md text-sm hover:bg-teal-600 transition"
                                        >
                                            View
                                        </Link> */}
                                        <button
                                            onClick={() =>
                                                confirm(
                                                    "Are You Sure Delete!"
                                                ) &&
                                                window.location.replace(
                                                    `/delete/${row.id}`
                                                )
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
                <div className="ml-80 mt-6">
                    {all.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 mx-1 rounded-lg ${
                                link.active
                                    ? "bg-white text-red-500"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
