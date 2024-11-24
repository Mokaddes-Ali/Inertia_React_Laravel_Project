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
        // handle success logic if necessary
      }
    });
  };

  return (
    <div className="card">
      <div className="card-header flex w-36 h-11">
        <div className="mx-5 mt-2">
          <a href="/brands/show">
            <button type="button" className="btn btn-info text-lg">
              Go To List
            </button>
          </a>
        </div>
        <div className="mx-5 mt-2 text-center text-2xl">
          Add Brand
        </div>
      </div>

      <div className="mx-5 mb-3 mt-3 col-md-10">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group col-md-8 mb-4">
            <label htmlFor="brandName" className="mb-2">BrandName</label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={brandName}
              onChange={handleBrandNameChange}
              className="form-control"
              placeholder="Enter Brand Name"
            />
          </div>

          <div className="form-group col-md-8 mb-4">
            <label htmlFor="brandImg" className="mb-2">BrandImg</label>
            <input
              type="file"
              name="brandImg"
              id="brandImg"
              onChange={handleBrandImgChange}
              className="form-control"
              placeholder="Input an Image"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;

