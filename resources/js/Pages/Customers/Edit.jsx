import React from "react";
import { useForm } from "react-hook-form";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ customer }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: customer.name,
            email: customer.email,
            number: customer.number,
            address: customer.address,
        },
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.pic[0]) {
            formData.append("pic", data.pic[0]);
        }
        formData.append("_method", "PUT");

        Inertia.post(`/customers/${customer.id}`, formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
                <label>Name</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    className="border p-2 w-full"
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div>
                <label>Email</label>
                <input
                    {...register("email", { required: "Email is required" })}
                    className="border p-2 w-full"
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div>
                <label>Number</label>
                <input
                    {...register("number")}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    {...register("address")}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Picture</label>
                <input {...register("pic")} type="file" className="border p-2 w-full" />
                {customer.pic && (
                    <div className="mt-2">
                        <img
                            src={`/storage/${customer.pic}`}
                            alt={customer.name}
                            className="h-20 w-20 object-cover rounded"
                        />
                    </div>
                )}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        </form>
    );
}
