import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
  const [brandName, setBrandName] = useState('');
  const [brandImg, setBrandImg] = useState(null);

  const handleBrandNameChange = (e) => setBrandName(e.target.value);
  const handleBrandImgChange = (e) => setBrandImg(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('brandName', brandName);
    formData.append('brandImg', brandImg);

    Inertia.post('/brands/submit', formData, {
      onSuccess: () => {
        // Add success handling logic if needed (e.g., show a success notification)
      },
    });
  };

  const handleReset = () => {
    setBrandName('');
    setBrandImg(null);
  };

  return (
    <>
      <AuthenticatedLayout>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <a href="/brands/show">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Go To List
              </button>
            </a>
            <h2 className="text-2xl font-semibold text-gray-800">Add Brand</h2>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Brand Name */}
            <div>
              <label
                htmlFor="brandName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                value={brandName}
                onChange={handleBrandNameChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter Brand Name"
                required
              />
            </div>

            {/* Brand Image */}
            <div>
              <label
                htmlFor="brandImg"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Brand Image
              </label>
              <input
                type="file"
                id="brandImg"
                name="brandImg"
                onChange={handleBrandImgChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
              {brandImg && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600">Selected File: {brandImg.name}</p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default Create;

