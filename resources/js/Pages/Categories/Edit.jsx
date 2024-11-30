import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Edit = ({ category }) => {
  const { data, setData, post, errors } = useForm({
    id: category.id,
    name: category.name || "",
    remarks: category.remarks || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("category.update"));
  };

  return (
    <>
    <AuthenticatedLayout>
    <div className="container mx-auto mt-12">
      <h1 className="text-2xl font-semibold mb-6">Edit Category</h1>
      <div className="flex justify-start">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hidden ID Field */}
            <input type="hidden" name="id" value={data.id} />

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200`}
                required
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            {/* Remarks Field */}
            <div>
              <label htmlFor="remarks" className="block text-gray-700">
                Remarks:
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={data.remarks}
                onChange={(e) => setData("remarks", e.target.value)}
                className={`w-full border ${
                  errors.remarks ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200`}
              ></textarea>
              {errors.remarks && (
                <div className="text-red-500 text-sm mt-1">{errors.remarks}</div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
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

export default Edit;
