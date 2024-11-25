import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ brands }) => {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      Inertia.delete(`/delete/${id}`, {
        onSuccess: () => alert('Brand deleted successfully!'),
        onError: () => alert('Failed to delete the brand.'),
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto py-2 mt-7">
        {/* Header Section */}
        <div className="flex justify-between items-center p-2 rounded-lg ">
          <h1 className="text-3xl font-bold text-gray-700">Brand List</h1>
          <Link
            href="/brands/add"
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow-md"
          >
            Add Brand
          </Link>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Brand Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Brand Image</th>
                <th className=" py-4 text-center text-sm font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.data.length > 0 ? (
                brands.data.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-b hover:bg-gray-100 transition duration-150"
                  >
                    <td className="px-6 py-4 text-gray-700">{brand.id}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{brand.brandName}</td>
                    <td className="px-6 py-4">
                      <img
                        src={`/BrandImage/${brand.brandImg}`}
                        alt={brand.brandName}
                        className="w-16 h-10 rounded-lg object-cover border shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-4">
                        {/* Edit Button */}
                        <Link
                          href={`/brands/edit/${brand.id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
                        >
                          Edit
                        </Link>
                        {/* Delete Button */}
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 "
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
                    className="px-6 py-6 text-center text-gray-500 font-medium"
                  >
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-3">
          {brands.links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={`px-4 py-2 mx-1 rounded-lg shadow-md ${
                link.active
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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

