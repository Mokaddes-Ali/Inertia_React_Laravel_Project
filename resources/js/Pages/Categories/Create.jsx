import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = () => {
  const { data, setData, post, errors } = useForm({
    name: '',
    remarks: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/category/store'); // Replace with your actual route
  };

  return (
    <>
    <AuthenticatedLayout>
    <div className="container mx-auto mt-5">
      {/* Header Section */}
      <div className="flex justify-start items-center p-4 bg-gray-100 rounded-md shadow-md">
        <a href="/category/show">
          <button
            type="button"
            className="btn btn-info bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go To List
          </button>
        </a>
        <h3 className="mx-5 text-lg font-semibold text-gray-700">Add Category</h3>
      </div>

      {/* Form Section */}
      <div className="mt-6 max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md space-y-4"
        >
          {/* Name Field */}
          <div className="form-group mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className={`form-control block w-full px-4 py-2 border ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } rounded-md`}
              required
            />
            {errors.name ? (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            ) : (
              <div className="text-green-500 text-sm mt-1">Looks good!</div>
            )}
          </div>

          {/* Remarks Field */}
          <div className="form-group mb-4">
            <label htmlFor="remarks" className="block text-gray-700 mb-2">
              Remarks:
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={data.remarks}
              onChange={(e) => setData('remarks', e.target.value)}
              className={`form-control block w-full px-4 py-2 border ${
                errors.remarks
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } rounded-md`}
            />
            {errors.remarks && (
              <div className="text-red-500 text-sm mt-1">{errors.remarks}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    </AuthenticatedLayout>
    </>
  );
};

export default Create;

