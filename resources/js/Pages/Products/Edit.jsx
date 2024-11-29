// import { useForm } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// const Edit = ({ product, categories, brands }) => {
//   // useForm হুক ব্যবহার
//   const { data, setData, put, processing, errors } = useForm({
//     name: product.name,
//     category_id: product.category_id,
//     brand_id: product.brand_id,
//     price: product.price,
//     cost: product.cost,
//     code: product.code,
//     unit: product.unit,
//     status: product.status,
//     details: product.details,
//     img_url: null, // initially set to null for image upload
//   });

//   // ফর্ম জমা দেওয়ার ফাংশন
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });

//     put(route('products.update', product.id), {
//       data: formData,
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   };


//   return (
//     <AuthenticatedLayout>
//       <div className="container mx-auto mt-4">
//         <div className="bg-white shadow-md rounded">
//           <div className="bg-blue-500 text-white text-center py-2">
//             <h3>Edit Product</h3>
//           </div>
//           <div className="p-4">
//             <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
//               <input type="hidden" name="_method" value="PUT" />

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Product Name */}
//                 <div>
//                   <label htmlFor="name" className="block mb-1 font-medium">Product Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={data.name}
//                     onChange={(e) => setData('name', e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                   />
//                   {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label htmlFor="category_id" className="block mb-1 font-medium">Category</label>
//                   <select
//                     name="category_id"
//                     value={data.category_id}
//                     onChange={(e) => setData('category_id', e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                   >
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.id}>{category.name}</option>
//                     ))}
//                   </select>
//                   {errors.category_id && <div className="text-red-500 text-sm">{errors.category_id}</div>}
//                 </div>

//                 {/* Brand */}
//                 <div>
//                   <label htmlFor="brand_id" className="block mb-1 font-medium">Brand</label>
//                   <select
//                     name="brand_id"
//                     value={data.brand_id}
//                     onChange={(e) => setData('brand_id', e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                   >
//                     {brands.map((brand) => (
//                       <option key={brand.id} value={brand.id}>{brand.brandName}</option>
//                     ))}
//                   </select>
//                   {errors.brand_id && <div className="text-red-500 text-sm">{errors.brand_id}</div>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 {/* Price */}
//                 <div>
//                   <label htmlFor="price" className="block mb-1 font-medium">Price</label>
//                   <input
//                     type="text"
//                     name="price"
//                     value={data.price}
//                     onChange={(e) => setData('price', e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                   />
//                   {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
//                 </div>

//                 {/* Cost */}
//                 <div>
//                   <label htmlFor="cost" className="block mb-1 font-medium">Cost</label>
//                   <input
//                     type="text"
//                     name="cost"
//                     value={data.cost}
//                     onChange={(e) => setData('cost', e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                   />
//                   {errors.cost && <div className="text-red-500 text-sm">{errors.cost}</div>}
//                 </div>

//                 {/* Code */}
//                 <div>
//                   <label htmlFor="code" className="block mb-1 font-medium">Code</label>
//                   <input
//                     type="text"
//                     name="code"
//                     value={data.code}
//                     onChange={(e) => setData('code', e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                   />
//                   {errors.code && <div className="text-red-500 text-sm">{errors.code}</div>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 {/* Units */}
//                 <div>
//                   <label htmlFor="unit" className="block mb-1 font-medium">Units</label>
//                   <input
//                     type="text"
//                     name="unit"
//                     value={data.unit}
//                     onChange={(e) => setData('unit', e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                   />
//                   {errors.unit && <div className="text-red-500 text-sm">{errors.unit}</div>}
//                 </div>

//                 {/* Product Image with Preview */}
//                 <div className="flex items-center">
//                   {product.img_url && (
//                     <div className="mr-3">
//                       <img
//                         src={`/productImage/${product.img_url}`}
//                         alt={product.name}
//                         className="w-16 h-16 rounded"
//                       />
//                     </div>
//                   )}
//                   <div>
//                     <label htmlFor="img_url" className="block mb-1 font-medium">Product Image</label>
//                     <input
//                       type="file"
//                       name="img_url"
//                       onChange={(e) => setData('img_url', e.target.files[0])}
//                       className="w-full border rounded px-3 py-2"
//                     />
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <label htmlFor="status" className="block mb-1 font-medium">Status</label>
//                   <select
//                     name="status"
//                     value={data.status}
//                     onChange={(e) => setData('status', e.target.value)}
//                     className="w-full border rounded px-3 py-2"
//                   >
//                     <option value="1">Active</option>
//                     <option value="0">Inactive</option>
//                   </select>
//                   {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="mt-4">
//                 <label htmlFor="details" className="block mb-1 font-medium">Details</label>
//                 <textarea
//                   name="details"
//                   value={data.details}
//                   onChange={(e) => setData('details', e.target.value)}
//                   className="w-full border rounded px-3 py-2"
//                 />
//                 {errors.details && <div className="text-red-500 text-sm">{errors.details}</div>}
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-center mt-6">
//                 <button
//                   type="submit"
//                   disabled={processing}
//                   className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
//                 >
//                   Update Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// };

// export default Edit;

import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Edit = ({ product, categories, brands }) => {
  const { data, setData, post, errors } = useForm({
    name: product.name || "",
    category_id: product.category_id || "",
    brand_id: product.brand_id || "",
    price: product.price || "",
    cost: product.cost || "",
    code: product.code || "",
    unit: product.unit || "",
    stock: product.stock || "",
    details: product.details,
    status: product.status || "1",
    img_url: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    post(route("products.update", product.id), {
      data: formData,
      onSuccess: () => alert("Product updated successfully!"),
    });
  };

  return (
    <>
    <AuthenticatedLayout>


    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Edit Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 space-y-6"
      >
        {/* Name, Category, Brand */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={data.category_id}
              onChange={(e) => setData("category_id", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Brand
            </label>
            <select
              value={data.brand_id}
              onChange={(e) => setData("brand_id", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <p className="text-sm text-red-500 mt-1">{errors.brand_id}</p>
            )}
          </div>
        </div>

        {/* Price, Cost, Discount */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price
            </label>
            <input
              type="number"
              value={data.price}
              onChange={(e) => setData("price", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Cost
            </label>
            <input
              type="number"
              value={data.cost}
              onChange={(e) => setData("cost", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter cost"
            />
            {errors.cost && (
              <p className="text-sm text-red-500 mt-1">{errors.cost}</p>
            )}
          </div>

           {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>
          <select
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        </div>

        {/* Code, Unit, Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Code
            </label>
            <input
              type="text"
              value={data.code}
              onChange={(e) => setData("code", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product code"
            />
            {errors.code && (
              <p className="text-sm text-red-500 mt-1">{errors.code}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Unit
            </label>
            <input
              type="number"
              value={data.unit}
              onChange={(e) => setData("unit", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter unit"
            />
            {errors.unit && (
              <p className="text-sm text-red-500 mt-1">{errors.unit}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Stock
            </label>
            <input
              type="number"
              value={data.stock}
              onChange={(e) => setData("stock", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter stock quantity"
            />
            {errors.stock && (
              <p className="text-sm text-red-500 mt-1">{errors.stock}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            value={data.details}
            onChange={(e) => setData("details", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
          />
          {errors.details && (
            <p className="text-sm text-red-500 mt-1">{errors.details}</p>
          )}
        </div>




        {/* Upload */}

        <div className=" flex">
            <div className="">
            {product.img_url && (
                    <div className="mr-3">
                      <img
                        src={`/productImage/${product.img_url}`}
                        alt={product.name}
                        className="w-16 h-16 rounded"
                      />
                    </div>
                  )}
                  <label className="block text-sm font-medium text-gray-600 mb-1">
            Product Image
          </label>
            </div>

          <input
            type="file"
            onChange={(e) => setData("img_url", e.target.files[0])}
            className="w-72 ml-12 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.img_url && (
            <p className="text-sm text-red-500 mt-1">{errors.img_url}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>

    </AuthenticatedLayout>
    </>
  );
};

export default Edit;
