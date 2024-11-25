// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { useForm } from '@inertiajs/react';

// const Edit = ({ product, categories, brands }) => {
//   const { data, setData, post, processing, errors } = useForm({
//     name: product.name,
//     category_id: product.category_id,
//     brand_id: product.brand_id,
//     price: product.price,
//     cost: product.cost,
//     code: product.code,
//     unit: product.unit,
//     status: product.status,
//     img_url: product.img_url,
//     details: product.details,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     put(route('products.update', product.id));
//   };

//   return (
//     <>
//     <AuthenticatedLayout>
//     <div className="container mx-auto mt-4">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="text-center bg-blue-600 text-white p-2 mb-4">
//           <h3 className="text-xl">Edit Product</h3>
//         </div>


//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             {/* Product Name */}
//             <div className="form-group">
//               <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={data.name}
//                 onChange={(e) => setData('name', e.target.value)}
//                 className="form-input mt-2 block w-full rounded-md border-gray-300"
//                 required
//               />
//               {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
//             </div>

//             {/* Category */}
//             <div className="form-group">
//               <label htmlFor="category_id" className="block text-sm font-medium">Category</label>
//               <select
//                 id="category_id"
//                 name="category_id"
//                 value={data.category_id}
//                 onChange={(e) => setData('category_id', e.target.value)}
//                 className="form-select mt-2 block w-full rounded-md border-gray-300"
//                 required
//               >
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Brand */}
//             <div className="form-group">
//               <label htmlFor="brand_id" className="block text-sm font-medium">Brand</label>
//               <select
//                 id="brand_id"
//                 name="brand_id"
//                 value={data.brand_id}
//                 onChange={(e) => setData('brand_id', e.target.value)}
//                 className="form-select mt-2 block w-full rounded-md border-gray-300"
//                 required
//               >
//                 {brands.map((brand) => (
//                   <option key={brand.id} value={brand.id}>
//                     {brand.brandName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             {/* Price */}
//             <div className="form-group">
//               <label htmlFor="price" className="block text-sm font-medium">Price</label>
//               <input
//                 type="text"
//                 id="price"
//                 name="price"
//                 value={data.price}
//                 onChange={(e) => setData('price', e.target.value)}
//                 className="form-input mt-2 block w-full rounded-md border-gray-300"
//                 required
//               />
//             </div>

//             {/* Cost */}
//             <div className="form-group">
//               <label htmlFor="cost" className="block text-sm font-medium">Cost</label>
//               <input
//                 type="text"
//                 id="cost"
//                 name="cost"
//                 value={data.cost}
//                 onChange={(e) => setData('cost', e.target.value)}
//                 className="form-input mt-2 block w-full rounded-md border-gray-300"
//                 required
//               />
//             </div>

//             {/* Code */}
//             <div className="form-group">
//               <label htmlFor="code" className="block text-sm font-medium">Code</label>
//               <input
//                 type="text"
//                 id="code"
//                 name="code"
//                 value={data.code}
//                 onChange={(e) => setData('code', e.target.value)}
//                 className="form-input mt-2 block w-full rounded-md border-gray-300"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             {/* Units */}
//             <div className="form-group">
//               <label htmlFor="unit" className="block text-sm font-medium">Units</label>
//               <input
//                 type="text"
//                 id="unit"
//                 name="unit"
//                 value={data.unit}
//                 onChange={(e) => setData('unit', e.target.value)}
//                 className="form-input mt-2 block w-full rounded-md border-gray-300"
//                 required
//               />
//             </div>

//             {/* Product Image */}
//             <div className="form-group flex items-center">
//               {product.img_url && (
//                 <div className="mr-3">
//                   <img
//                     src={`/productImage/${product.img_url}`}
//                     alt={product.name}
//                     className="w-16 h-16 object-cover rounded-full"
//                   />
//                 </div>
//               )}
//               <div className="flex-1">
//                 <label htmlFor="img_url" className="block text-sm font-medium">Product Image</label>
//                 <input
//                   type="file"
//                   id="img_url"
//                   name="img_url"
//                   onChange={(e) => setData('img_url', e.target.files[0])}
//                   className="form-input mt-2 block w-full rounded-md border-gray-300"
//                 />
//               </div>
//             </div>

//             {/* Status */}
//             <div className="form-group">
//               <label htmlFor="status" className="block text-sm font-medium">Status</label>
//               <select
//                 id="status"
//                 name="status"
//                 value={data.status}
//                 onChange={(e) => setData('status', e.target.value)}
//                 className="form-select mt-2 block w-full rounded-md border-gray-300"
//               >
//                 <option value="1">Active</option>
//                 <option value="0">Inactive</option>
//               </select>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="form-group mb-4">
//             <label htmlFor="details" className="block text-sm font-medium">Details</label>
//             <textarea
//               id="details"
//               name="details"
//               value={data.details}
//               onChange={(e) => setData('details', e.target.value)}
//               className="form-textarea mt-2 block w-full rounded-md border-gray-300"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
//               disabled={processing}
//             >
//               {processing ? 'Updating...' : 'Update Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </AuthenticatedLayout>
//     </>
//   );
// };

// export default Edit;

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

const Edit = ({ product, categories, brands }) => {


  return (
    <AuthenticatedLayout>
<div className="container mx-auto mt-4">
    <div className="bg-white shadow-md rounded">
        <div className="bg-blue-500 text-white text-center py-2">
            <h3>Edit Product</h3>
        </div>
        <div className="p-4">
           
            <form
                method="POST"
                action={route("products.update", product.id)}
                encType="multipart/form-data"
            >
                <input type="hidden" name="_method" value="PUT" />
                <input type="hidden" name="_token" value={csrfToken} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={product.name}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category_id" className="block mb-1 font-medium">
                            Category
                        </label>
                        <select
                            name="category_id"
                            defaultValue={product.category_id}
                            required
                            className="w-full border rounded px-3 py-2"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand_id" className="block mb-1 font-medium">
                            Brand
                        </label>
                        <select
                            name="brand_id"
                            defaultValue={product.brand_id}
                            required
                            className="w-full border rounded px-3 py-2"
                        >
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.brandName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block mb-1 font-medium">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            defaultValue={product.price}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Cost */}
                    <div>
                        <label htmlFor="cost" className="block mb-1 font-medium">
                            Cost
                        </label>
                        <input
                            type="text"
                            name="cost"
                            defaultValue={product.cost}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Code */}
                    <div>
                        <label htmlFor="code" className="block mb-1 font-medium">
                            Code
                        </label>
                        <input
                            type="text"
                            name="code"
                            defaultValue={product.code}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Units */}
                    <div>
                        <label htmlFor="unit" className="block mb-1 font-medium">
                            Units
                        </label>
                        <input
                            type="text"
                            name="unit"
                            defaultValue={product.unit}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Product Image with Preview */}
                    <div className="flex items-center">
                        {product.img_url && (
                            <div className="mr-3">
                                <img
                                    src={`/productImage/${product.img_url}`}
                                    alt={product.name}
                                    className="w-16 h-16 rounded"
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="img_url" className="block mb-1 font-medium">
                                Product Image
                            </label>
                            <input
                                type="file"
                                name="img_url"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block mb-1 font-medium">
                            Status
                        </label>
                        <select
                            name="status"
                            defaultValue={product.status}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Details */}
                <div className="mt-4">
                    <label htmlFor="details" className="block mb-1 font-medium">
                        Details
                    </label>
                    <textarea
                        name="details"
                        defaultValue={product.details}
                        className="w-full border rounded px-3 py-2"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

    </AuthenticatedLayout>
  );
};

export default Edit;
