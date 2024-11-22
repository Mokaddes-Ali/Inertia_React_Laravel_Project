import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";

export default function Topbar({ user }) {
    // Fallback user if not provided
    const fallbackUser = { name: "Guest" };
    const currentUser = user || fallbackUser;

    return (
        <div className="w-full bg-white shadow flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Logo or Title */}
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                </Link>
            </div>

            {/* Notification and User Dropdown */}
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <i className="fas fa-bell text-gray-600"></i>
                </button>
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200">
                            {/* User Name */}
                            <span className="text-gray-800">{currentUser.name}</span>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link href={route("logout")} method="post" as="button">
                            Logout
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}
