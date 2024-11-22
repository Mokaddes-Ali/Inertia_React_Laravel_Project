import React from "react";
import { useForm } from "react-hook-form";
import { Inertia } from "@inertiajs/inertia";

export default function Create() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        Inertia.post("/customers", formData);
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
                <label>Picture</label>
                <input {...register("pic")} type="file" className="border p-2 w-full" />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
}
