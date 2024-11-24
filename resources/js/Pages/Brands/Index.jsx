import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { brands, flash } = usePage().props;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Brand List</h1>
            {flash.success && <div className="text-green-600 mb-3">{flash.success}</div>}

            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">ID</th>
                        <th className="border border-gray-200 px-4 py-2">Brand Name</th>
                        <th className="border border-gray-200 px-4 py-2">Image</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand) => (
                        <tr key={brand.id}>
                            <td className="border border-gray-200 px-4 py-2">{brand.id}</td>
                            <td className="border border-gray-200 px-4 py-2">{brand.brandName}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <img
                                    src={`/BrandImage/${brand.brandImg}`}
                                    alt={brand.brandName}
                                    className="h-10 w-10 object-cover"
                                />
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <Link
                                    href={`/brands/edit/${brand.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <form
                                    method="POST"
                                    action={`/brands/delete/${brand.id}`}
                                    style={{ display: 'inline' }}
                                >
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <button
                                        type="submit"
                                        className="text-red-600 hover:underline ml-2"
                                        onClick={(e) =>
                                            confirm('Are you sure you want to delete this brand?') ||
                                            e.preventDefault()
                                        }
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
