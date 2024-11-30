import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = ({ categories, brands }) => {
  const { data, setData, post, errors } = useForm({
    name: "",
    category_id: "",
    brand_id: "",
    price: "",
    cost: "",
    code: "",
    unit: "",
    details: "",
    img_url: null,
    status: "1",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/products/store', data, {
      onSuccess: (response) => {
        // Show success message after the product is added successfully
        alert('Product added successfully!');

        // Optionally redirect to the product list page
        // window.location.href = '/products';
      },
      onError: (errors) => {
        // Handle any errors
        alert('There was an error adding the product.');
      },
    });
  };

  return (
    <>
    <AuthenticatedLayout>
    <div className="  mt-10 ml-12">
      <div className="shadow-sm max-w-7xl mx-auto">
        {/* Card Header */}
        <div className="bg-blue-500 text-white text-center py-2">
          <h3 className="text-lg font-bold">Add New Product</h3>
        </div>

        {/* Card Body */}
        <div className="p-5 bg-white">
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              <ul className="list-disc pl-5">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter product name"
                  required
                />
                {errors.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  id="category_id"
                  value={data.category_id}
                  onChange={(e) => setData("category_id", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <small className="text-red-500">{errors.category_id}</small>
                )}
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="brand_id" className="block text-sm font-medium">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  name="brand_id"
                  id="brand_id"
                  value={data.brand_id}
                  onChange={(e) => setData("brand_id", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Select a brand
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
                {errors.brand_id && (
                  <small className="text-red-500">{errors.brand_id}</small>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={data.price}
                  onChange={(e) => setData("price", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter product price"
                  required
                />
                {errors.price && <small className="text-red-500">{errors.price}</small>}
              </div>

              {/* Cost */}
              <div>
                <label htmlFor="cost" className="block text-sm font-medium">
                  Cost <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  value={data.cost}
                  onChange={(e) => setData("cost", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter product cost"
                  required
                />
                {errors.cost && <small className="text-red-500">{errors.cost}</small>}
              </div>

              {/* Product Code */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium">
                  Product Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={data.code}
                  onChange={(e) => setData("code", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter product code"
                  required
                />
                {errors.code && <small className="text-red-500">{errors.code}</small>}
              </div>

              {/* Units */}
              <div>
                <label htmlFor="unit" className="block text-sm font-medium">
                  Units <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="unit"
                  id="unit"
                  value={data.unit}
                  onChange={(e) => setData("unit", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter available units"
                  required
                />
                {errors.unit && <small className="text-red-500">{errors.unit}</small>}
              </div>

              {/* Details */}
              <div>
                <label htmlFor="details" className="block text-sm font-medium">
                  Details
                </label>
                <textarea
                  name="details"
                  id="details"
                  value={data.details}
                  onChange={(e) => setData("details", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  rows="3"
                ></textarea>
                {errors.details && <small className="text-red-500">{errors.details}</small>}
              </div>

              {/* Product Image */}
              <div>
                <label htmlFor="img_url" className="block text-sm font-medium">
                  Product Image
                </label>
                <input
                  type="file"
                  name="img_url"
                  id="img_url"
                  onChange={(e) => setData("img_url", e.target.files[0])}
                  className="mt-1 block w-full"
                />
                {errors.img_url && <small className="text-red-500">{errors.img_url}</small>}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                {errors.status && <small className="text-red-500">{errors.status}</small>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </AuthenticatedLayout>
    </>
  );
};

export default Create;
