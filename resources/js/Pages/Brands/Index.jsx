import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ brands }) => {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      // Replace with your actual delete logic, e.g., Inertia.delete(`/brands/delete/${id}`)
      console.log(`Deleting brand with ID: ${id}`);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Brand List</h1>
          <Link
            href="/brands"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Add Brand
          </Link>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Brand Name</th>
                <th className="px-4 py-2 text-left">Brand Image</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <tr key={brand.id} className="border-b">
                    <td className="px-4 py-2">{brand.id}</td>
                    <td className="px-4 py-2">{brand.brandName}</td>
                    <td className="px-4 py-2">
                      <img
                        src={`/BrandImage/${brand.brandImg}`}
                        alt={brand.brandName}
                        className="w-12 h-12 rounded object-cover border"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center space-x-3">
                        {/* Edit Button */}
                        <Link
                          href={`/brands/edit/${brand.id}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        {/* Delete Button */}
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDelete(brand.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;


