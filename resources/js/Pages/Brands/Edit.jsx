import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toastify

const Edit = ({ record }) => {
  const { data, setData, post, progress, errors } = useForm({
    id: record.id,
    brandName: record.brandName,
    brandImg: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('brands.update'), {
      data,
      onSuccess: () => {
        toast.success('Brand updated successfully!', { position: "top-right" }); // Success message

        Inertia.visit(route('brands.show'));
      },
      onError: () => {
        toast.error('There was an error updating the brand.', { position: "top-right" }); // Error message
      },
    });
  };

  return (
    <>
    <AuthenticatedLayout>
      <div className="bg-white shadow-lg rounded-lg p-8 mt-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <a href={route('brands.show')}>
            <button type="button" className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300">
              Back To List
            </button>
          </a>
          <h2 className="text-2xl font-semibold text-gray-800">Edit Brand</h2>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <input type="hidden" value={data.id} name="id" />

          {/* Brand Name */}
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
            <input
              type="text"
              value={data.brandName}
              name="brandName"
              id="brandName"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Brand Name"
              onChange={(e) => setData('brandName', e.target.value)}
              required
            />
            {errors.brandName && <p className="text-red-500 text-sm mt-1">{errors.brandName}</p>}
          </div>

          {/* Brand Image */}
          <div>
            <label htmlFor="brandImg" className="block text-sm font-medium text-gray-700 mb-2">Brand Image</label>
            <input
              type="file"
              name="brandImg"
              id="brandImg"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setData('brandImg', e.target.files[0])}
            />
            {record.brandImg && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">Current Image:</p>
                <img src={`/BrandImage/${record.brandImg}`} alt="Brand" width="100" height="100" className="rounded-lg mt-2" />
              </div>
            )}
            {errors.brandImg && <p className="text-red-500 text-sm mt-1">{errors.brandImg}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
            >
              {progress ? (
                <div className="animate-spin border-t-2 border-white border-solid rounded-full w-6 h-6 mx-auto"></div>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ToastContainer to display toast messages */}
      <ToastContainer />
    </AuthenticatedLayout>
    </>
  );
};

export default Edit;

