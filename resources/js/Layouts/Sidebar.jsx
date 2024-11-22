import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTachometerAlt,faEdit,faChevronDown,faChevronUp,faCog,faPlus,faList,
    faSlidersH,faUserCircle,faUsers,faTags,faBoxes,faShoppingCart,faDatabase,faChartLine
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { url } = usePage();

    useEffect(() => {

        if (url.includes("posts") && activeDropdown !== 1) {
            setActiveDropdown(1);
        } else if (url.includes("settings") && activeDropdown !== 2) {
            setActiveDropdown(2);
        } else if (url.includes("customer") && activeDropdown !== 3) {
            setActiveDropdown(3);
        }
    }, [url]);

    const toggleDropdown = (index) => {
        setActiveDropdown((prev) => (prev === index ? null : index));
    };

    return (
        <div className="w-56 bg-gray-800 text-white h-screen fixed overflow-y-auto">
            <div className="p-4 text-center font-bold text-xl border-b border-gray-600">
                My App
            </div>
            <nav className="mt-4">
                {/* Dashboard Link */}
                <div className="px-4 py-2">
                    <Link
                        href="/dashboard"
                        className={`block py-2 px-3 rounded ${
                            url.startsWith("/dashboard")
                                ? "bg-gray-700 text-orange-500"
                                : "hover:bg-gray-700"
                        }`}
                    >
                        <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" /> Dashboard
                    </Link>
                </div>

                {/* Posts Dropdown */}
                <div className="px-4 py-2">
                    <button
                        onClick={() => toggleDropdown(1)}
                        className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
                            activeDropdown === 1 ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
                        }`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Posts
                        </span>
                        <FontAwesomeIcon
                            icon={activeDropdown === 1 ? faChevronUp : faChevronDown}
                            className="transform transition-transform duration-300"
                        />
                    </button>
                    {activeDropdown === 1 && (
                        <div className="ml-4 mt-2 space-y-2">
                            <Link
                                href="/posts/add"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/posts/add")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Post
                            </Link>
                            <Link
                                href="/posts/list"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/posts/list")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                <FontAwesomeIcon icon={faList} className="mr-2" /> All Posts
                            </Link>
                        </div>
                    )}
                </div>

                {/* Settings Dropdown */}
                <div className="px-4 py-2">
                    <button
                        onClick={() => toggleDropdown(2)}
                        className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
                            activeDropdown === 2 ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
                        }`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
                        </span>
                        <FontAwesomeIcon
                            icon={activeDropdown === 2 ? faChevronUp : faChevronDown}
                            className="transform transition-transform duration-300"
                        />
                    </button>
                    {activeDropdown === 2 && (
                        <div className="ml-4 mt-2 space-y-2">
                            <Link
                                href="/settings/general"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/settings/general")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                <FontAwesomeIcon icon={faSlidersH} className="mr-2" /> General
                            </Link>
                            <Link
                                href="/settings/account"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/settings/account")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                <FontAwesomeIcon icon={faUserCircle} className="mr-2" /> Account
                            </Link>
                        </div>
                    )}
                </div>

                {/* Customer Dropdown */}
                <div className="px-4 py-2">
                    <button
                        onClick={() => toggleDropdown(3)}
                        className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
                            activeDropdown === 3 ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
                        }`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUsers} className="mr-2" /> Customers
                        </span>
                        <FontAwesomeIcon
                            icon={activeDropdown === 3 ? faChevronUp : faChevronDown}
                            className="transform transition-transform duration-300"
                        />
                    </button>
                    {activeDropdown === 3 && (
                        <div className="ml-4 mt-2 space-y-2">
                            <Link
                                href="/customer"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/customers/add")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                Add Customer
                            </Link>
                            <Link
                                href="/customer/show"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/customers/list")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                Customer List
                            </Link>
                        </div>
                    )}
                </div>

                {/* Additional Dropdowns */}
                {[
                    { label: "Category", icon: faTags, id: 4 },
                    { label: "Brand", icon: faChartLine, id: 5 },
                    { label: "Product", icon: faBoxes, id: 6 },
                    { label: "Sale", icon: faShoppingCart, id: 7 },
                    { label: "Database", icon: faDatabase, id: 8 }
                ].map((item) => (
                    <div key={item.id} className="px-4 py-2">
                        <button
                            onClick={() => toggleDropdown(item.id)}
                            className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
                                activeDropdown === item.id ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
                            }`}
                        >
                            <span>
                                <FontAwesomeIcon icon={item.icon} className="mr-2" /> {item.label}
                            </span>
                            <FontAwesomeIcon
                                icon={activeDropdown === item.id ? faChevronUp : faChevronDown}
                                className="transform transition-transform duration-300"
                            />
                        </button>
                        {activeDropdown === item.id && (
                            <div className="ml-4 mt-2 space-y-2">
                                <Link href={`/${item.label.toLowerCase()}/add`} className="block py-2 px-3 rounded hover:bg-gray-700">
                                    Add {item.label}
                                </Link>
                                <Link href={`/${item.label.toLowerCase()}/list`} className="block py-2 px-3 rounded hover:bg-gray-700">
                                    {item.label} List
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
}
