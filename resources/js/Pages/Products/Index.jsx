import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = () => {
    const { products } = usePage().props;



    return (
        <>
        <AuthenticatedLayout>
        <div className="container mx-auto mt-5">
            <div className="shadow-md bg-white rounded">
                <div className="flex justify-between items-center bg-gray-100 p-4 border-b">
                    <Link
                        href="/products/create"
                        className="btn btn-success text-white px-4 py-2 rounded"
                    >
                        Add Product
                    </Link>
                    <h2 className="text-xl font-semibold">Product List</h2>
                </div>

                <div className="p-4">
                    {products.data.length === 0 ? (
                        <p className="text-gray-600">No products available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-left">
                                        <th className="border p-2">ID</th>
                                        <th className="border p-2">
                                            Pro. Image
                                        </th>
                                        <th className="border p-2">Name</th>
                                        <th className="border p-2">Category</th>
                                        <th className="border p-2">Brand</th>
                                        <th className="border p-2">Price</th>
                                        <th className="border p-2">Cost</th>
                                        <th className="border p-2">Code</th>
                                        <th className="border p-2">Units</th>
                                        <th className="border p-2">Status</th>
                                        <th className="border p-2">Action</th>
                                        <th className="border p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="border p-2">
                                                {product.id}
                                            </td>
                                            <td className="border p-2">
                                                {product.img_url ? (
                                                    <img
                                                        src={`/productImage/${product.img_url}`}
                                                        alt={product.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                ) : (
                                                    <img
                                                        src="/default.jpg"
                                                        alt="No Image"
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                )}
                                            </td>
                                            <td className="border p-2">
                                                {product.name}
                                            </td>
                                            <td className="border p-2">
                                                {product.category.name}
                                            </td>
                                            <td className="border p-2">
                                                {product.brand.brandName}
                                            </td>
                                            <td className="border p-2">
                                                ${product.price}
                                            </td>
                                            <td className="border p-2">
                                                ${product.cost}
                                            </td>
                                            <td className="border p-2">
                                                {product.code}
                                            </td>
                                            <td className="border p-2">
                                                {product.unit}
                                            </td>
                                            <td className="border p-2">
                                                {product.status === 1 ? (
                                                    <span className="text-green-700">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="text-red-700">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="border p-2 flex space-x-2">
                                                {/* Edit Button */}
                                                <Link
                                                    href={`/products/edit/${product.id}`}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                                >
                                                    Edit
                                                </Link>

                                                {/* Delete Button */}
                                                <form
                                                    method="POST"
                                                    action={`/products/delete/${product.id}`}
                                                    onSubmit={(e) => {
                                                        if (
                                                            !confirm(
                                                                "Are you sure?"
                                                            )
                                                        )
                                                            e.preventDefault();
                                                    }}
                                                    className="inline"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="_method"
                                                        value="DELETE"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
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
                    )}

                    <div className="mt-4 flex justify-center">
                        {/* Pagination */}
                        <div className="flex space-x-2">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 border rounded ${
                                        link.active
                                            ? "bg-blue-500 text-white"
                                            : "bg-white"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
        </>
    );
};

export default Index;
