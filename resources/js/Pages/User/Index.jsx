import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';

const Index = () => {
    const { data, can } = usePage().props;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users Management</h2>
                {can['role-edit'] && (
                    <Link
                        href={route('users.create')}
                        className="btn btn-success bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    >
                        <i className="fa fa-plus"></i> Add New User
                    </Link>
                )}
            </div>


            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Roles</th>

                            <th className="border border-gray-300 px-4 py-2" style={{ width: '280px' }}>
                                Action
                            </th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {user.roleNames?.length > 0 &&
                                    user.roleNames.map((role, idx) => (
                                        <span key={idx} className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded mr-2">
                                            {role}
                                        </span>
                                    ))}
                            </td>
                            {can['role-edit'] && (
                                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                    <Link
                                        href={route('users.show', user.id)}
                                        className="btn btn-info bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                                    >
                                        <i className="fa-solid fa-list"></i> Show
                                    </Link>
                                    <Link
                                        href={route('users.edit', user.id)}
                                        className="btn btn-warning bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (confirm('Are you sure you want to delete this user?')) {
                                                Inertia.delete(route('users.destroy', user.id));
                                            }
                                        }}
                                        className="inline"
                                    >
                                        <button
                                            type="submit"
                                            className="btn btn-danger bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};




export default Index


// import React from 'react';
// import { Link } from '@inertiajs/inertia-react';

// const Index = ({ users }) => {
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold mb-6">Users Management</h2>
//             <table className="table-auto w-full border-collapse border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th className="border border-gray-300 px-4 py-2">ID</th>
//                         <th className="border border-gray-300 px-4 py-2">Name</th>
//                         <th className="border border-gray-300 px-4 py-2">Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id} className="hover:bg-gray-50">
//                             <td className="border border-gray-300 px-4 py-2">{user.id}</td>
//                             <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//                             <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Index;
