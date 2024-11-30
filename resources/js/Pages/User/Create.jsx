import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';

const Create = ({ roles, errors }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        roles: [],
    });

    const [formErrors, setFormErrors] = useState(errors || {});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else if (type === "select-multiple") {
            setFormData({
                ...formData,
                [name]: Array.from(e.target.selectedOptions, option => option.value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('users.store'), formData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Add New User</h2>
                    <InertiaLink href={route('users.index')} className="btn btn-outline-secondary btn-sm">
                        <i className="fa fa-arrow-left"></i> Back
                    </InertiaLink>
                </div>

                {/* Error Messages */}
                {Object.keys(formErrors).length > 0 && (
                    <div className="alert alert-danger mb-4 p-4 bg-red-100 border border-red-500 rounded-md text-red-700">
                        <strong>Whoops!</strong> There were some problems with your input.
                        <button type="button" className="btn-close" onClick={() => setFormErrors({})}>
                            <i className="fa fa-times"></i>
                        </button>
                        <ul>
                            {Object.values(formErrors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="card shadow-sm p-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700"><strong>Name:</strong></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter user's name"
                                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700"><strong>Email:</strong></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700"><strong>Password:</strong></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter a strong password"
                                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="roles" className="block text-gray-700"><strong>Role:</strong></label>
                            <select
                                name="roles[]"
                                id="roles"
                                multiple
                                value={formData.roles}
                                onChange={handleChange}
                                className="form-multiselect mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary py-2 px-6 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                <i className="fa-solid fa-floppy-disk"></i> Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};




export default Create
