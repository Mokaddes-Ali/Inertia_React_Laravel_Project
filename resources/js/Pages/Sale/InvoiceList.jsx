import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const InvoiceList = ({ invoices, canSaleCreate, canSaleDelete }) => {
    return (
        <>
        <AuthenticatedLayout>
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {canSaleCreate && (
                        <Link href="/sale">
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                Sale Add
                            </button>
                        </Link>
                    )}
                </div>
                <h2 className="text-2xl font-semibold text-center">Invoice List</h2>
                <div className="flex space-x-2">
                    <Link href="/sale-export1">
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Excel
                        </button>
                    </Link>
                    <Link href="/sale-export2">
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            CSV
                        </button>
                    </Link>
                    <Link href="/sale-export3">
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            PDF
                        </button>
                    </Link>
                </div>
            </div>

            <table className="w-full mt-6 border border-gray-300">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="border p-2">Invoice ID</th>
                        <th className="border p-2">Customer</th>
                        <th className="border p-2">Products</th>
                        <th className="border p-2">VAT</th>
                        <th className="border p-2">Payable</th>
                        <th className="border p-2">Paid</th>
                        <th className="border p-2">Due</th>
                        <th className="border p-2">Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-100">
                            <td className="border p-2">{invoice.id}</td>
                            <td className="border p-2">{invoice.customer.name}</td>
                            <td className="border p-2">
                                <ul className="list-none m-0 p-0">
                                    {invoice.products.map((product, index) => (
                                        <li
                                            key={index}
                                            className="mb-2 pb-2 border-b border-gray-300"
                                        >
                                            <strong>{index + 1}.</strong>{" "}
                                            <span className="font-semibold">
                                                {product.name ?? "Product not found"}
                                            </span>
                                            <br />
                                            <span>Quantity: {product.qty}</span>{" "}
                                            | <span>Price: ${product.sale_price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </td>

                            <td className="border p-2">{invoice.vat}</td>
                            <td className="border p-2">{invoice.payable}</td>
                            <td className="border p-2">{invoice.paid}</td>
                            <td className="border p-2">{invoice.due}</td>
                            <td className="border p-2 space-y-2">
                                <Link
                                    href={`/view/salelist/${invoice.id}`}
                                    className="block bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/view/salelist/pdf/${invoice.id}`}
                                    className="block bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                >
                                    PDF
                                </Link>
                                {canSaleDelete && (
                                    <Link
                                        href={`/delete/invoice/${invoice.id}`}
                                        method="delete"
                                        onClick={() =>
                                            confirm("Are you sure to delete?")
                                        }
                                        className="block bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AuthenticatedLayout>
        </>
    );
};

export default InvoiceList;
