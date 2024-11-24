import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const  Index = ({ brands, links }) => {
  const handleDelete = (id) => {
    if (confirm('Are You Sure Delete!')) {
      // Replace this with your actual delete logic, e.g., Inertia.delete(`/delete/${id}`)
      console.log(`Delete brand with id: ${id}`);
    }
  };

  return (
    <div className="card">
      <div className="card-header flex items-center w-36 h-11">
        <div className="mx-5 mt-2">
          <Link href="/brands">
            <button type="button" className="btn btn-danger text-lg">Add Brand</button>
          </Link>
        </div>
        <div className="mx-5 mt-2 text-center text-2xl">Brand List</div>
      </div>

      <table className="table table-striped table-responsive table-dark mt-5">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Brand Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <th scope="row">{brand.id}</th>
              <td>{brand.brandName}</td>
              <td>
                <img
                  src={`/BrandImage/${brand.brandImg}`}
                  alt="Brand"
                  width="50"
                  height="50"
                  className="rounded"
                />
              </td>
              <td className="flex space-x-2">
                {/* Edit Button */}
                <Link
                  href={`/brands/edit/${brand.id}`}
                  className="btn btn-primary btn-sm"
                  title="Edit"
                >
                  <i className="fa fa-pencil-alt" />
                </Link>
                {/* Delete Button */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(brand.id)}
                  title="Delete"
                >
                  <i className="fa fa-times" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url || '#'}
            className={`px-3 py-1 mx-1 rounded ${
              link.active ? 'bg-gray-700 text-orange-500' : 'hover:bg-gray-700'
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
  );
};




export default Index;

