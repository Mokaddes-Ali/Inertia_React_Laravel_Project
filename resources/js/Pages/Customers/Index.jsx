import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";

const Index = () => {
  const { all, can } = usePage().props;

  return (
    <div className="card bg-gray-800 text-white rounded-lg shadow-lg p-4">
      {/* Header Section */}
      <div className="card-header flex items-center justify-between">
        {can["customer-create"] && (
          <div className="mx-5 mt-2">
            <Link href="/customer">
              <button type="button" className="btn btn-success text-white">
                Add Customer
              </button>
            </Link>
          </div>
        )}
        <div className="mx-5 mt-2 text-center text-xl font-bold">
          List of Customer
        </div>
      </div>

      {/* Table */}
      <table className="table-auto w-full mt-4 bg-gray-900 text-gray-100 rounded-lg">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Id</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Number</th>
            <th className="p-2">Address</th>
            <th className="p-2">Image</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {all.map((row) => (
            <tr key={row.id} className="border-b border-gray-700">
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.name}</td>
              <td className="p-2">{row.email}</td>
              <td className="p-2">{row.number}</td>
              <td className="p-2">{row.address}</td>
              <td className="p-2">
                <img
                  src={`/images/${row.pic}`}
                  alt="Customer"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="p-2 space-x-2">
                {/* Edit Button */}
                {can["customer-edit"] && (
                  <Link
                    href={`/customer/edit/${row.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fa fa-pencil-alt"></i>
                  </Link>
                )}

                {/* View Button */}
                <Link
                  href={`/customer/dataShow/${row.id}`}
                  className="btn btn-info btn-sm"
                >
                  <i className="bi bi-eye"></i>
                </Link>

                {/* Delete Button */}
                {can["customer-delete"] && (
                  <Link
                    href={`/delete/${row.id}`}
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      confirm("Are you sure you want to delete this?")
                    }
                  >
                    <i className="fa fa-times"></i>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
