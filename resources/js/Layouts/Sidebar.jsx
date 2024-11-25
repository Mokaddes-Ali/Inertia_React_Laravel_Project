import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTachometerAlt,faChevronDown,faChevronUp,faCog,faPlus,faList,
    faSlidersH,faUserCircle,faUsers,faDatabase,faTags,faBoxesStacked,faCartShopping, faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavLink from "@/Components/NavLink";


export default function Sidebar() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { url } = usePage();

    useEffect(() => {

        if (url.includes("products") && activeDropdown !== 1) {
            setActiveDropdown(1);
        } else if (url.includes("settings") && activeDropdown !== 2) {
            setActiveDropdown(2);
        } else if (url.includes("customer") && activeDropdown !== 3) {
            setActiveDropdown(3);
        } else if (url.includes("brands") && activeDropdown !== 4) {
            setActiveDropdown(4);
        }else if (url.includes("categories") && activeDropdown !== 5) {
            setActiveDropdown(5);
        }else if (url.includes("sales") && activeDropdown !== 6) {
            setActiveDropdown(6);
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

         {/* Customers Dropdown */}
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
                href="/customers/add"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/customers/add")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Customer
            </Link>
            <Link
                href="/customers/show"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/customers/show")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faList} className="mr-2" /> All Customers
            </Link>
        </div>
    )}
</div>

{/* Brands Dropdown */}
<div className="px-4 py-2">
    <button
        onClick={() => toggleDropdown(4)}
        className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
            activeDropdown === 4 ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
        }`}
    >
        <span>
            <FontAwesomeIcon icon={faTags} className="mr-2" /> Brands
        </span>
        <FontAwesomeIcon
            icon={activeDropdown === 4 ? faChevronUp : faChevronDown}
            className="transform transition-transform duration-300"
        />
    </button>
    {activeDropdown === 4 && (
        <div className="ml-4 mt-2 space-y-2">
            <Link
                href="/brands/add"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/brands/add")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Brand
            </Link>
            <Link
                href="/brands/show"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/brands/show")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faList} className="mr-2" /> All Brands
            </Link>
        </div>
    )}
</div>

{/* Categories Dropdown */}
<div className="px-4 py-2">
    <button
        onClick={() => toggleDropdown(5)}
        className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
            activeDropdown === 5 ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
        }`}
    >
        <span>
            <FontAwesomeIcon icon={faBoxesStacked} className="mr-2" /> Categories
        </span>
        <FontAwesomeIcon
            icon={activeDropdown === 5 ? faChevronUp : faChevronDown}
            className="transform transition-transform duration-300"
        />
    </button>
    {activeDropdown === 5 && (
        <div className="ml-4 mt-2 space-y-2">
            <Link
                href="/categories/add"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/categories/add")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Category
            </Link>
            <Link
                href="/categories/show"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/categories/show")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faList} className="mr-2" /> All Categories
            </Link>
        </div>
    )}
</div>

{/* Products Dropdown */}
<div className="px-4 py-2">
    <button
        onClick={() => toggleDropdown(1)}
        className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
            activeDropdown === 1 ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
        }`}
    >
        <span>
            <FontAwesomeIcon icon={faCartShopping} className="mr-2" /> Products
        </span>
        <FontAwesomeIcon
            icon={activeDropdown === 1 ? faChevronUp : faChevronDown}
            className="transform transition-transform duration-300"
        />
    </button>
    {activeDropdown === 1 && (
        <div className="ml-4 mt-2 space-y-2">
            <Link
                href="/products/create"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/products/create")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Product
            </Link>
            <Link
                href="/products/show"
                className={`block py-2 px-3 rounded ${
                    url.startsWith("/products/show")
                        ? "bg-gray-700 text-orange-500"
                        : "hover:bg-gray-700"
                }`}
            >
                <FontAwesomeIcon icon={faList} className="mr-2" /> All Products
            </Link>
        </div>
    )}
</div>

                   {/* // Sales Dropdown */}
                   <div className="px-4 py-2">
                    <button
                        onClick={() => toggleDropdown(6)}
                        className={`w-full text-left py-2 px-3 flex justify-between items-center rounded ${
                            activeDropdown === 6 ? "bg-gray-700 text-orange-500" : "hover:bg-gray-700"
                        }`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2" /> Sales
                        </span>
                        <FontAwesomeIcon
                            icon={activeDropdown === 6 ? faChevronUp : faChevronDown}
                            className="transform transition-transform duration-300"
                        />
                    </button>
                    {activeDropdown === 6 && (
                        <div className="ml-4 mt-2 space-y-2">




                             <NavLink
                                href="/sales/add"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/sales/add")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Sales
                            </NavLink>
                            <NavLink
                                href="/sales/show"
                                className={`block py-2 px-3 rounded ${
                                    url.startsWith("/sales/show")
                                        ? "bg-gray-700 text-orange-500"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                             <FontAwesomeIcon icon={faList} className="mr-2" /> All Sales
                             </NavLink>
                        </div>
                    )}
                </div>

                  {/* Database Link */}
                  <div className="px-4 py-2">
                    <Link
                        href="/backup"
                        className={`block py-2 px-3 rounded ${
                            url.startsWith("/backup")
                                ? "bg-gray-700 text-orange-500"
                                : "hover:bg-gray-700"
                        }`}
                    >
                        <FontAwesomeIcon icon={faDatabase} className="mr-2" /> Dashboard
                    </Link>
                </div>

                <ResponsiveNavLink
    as="button"
    method="post"
    href={route('logout')}
>
    Log Out
</ResponsiveNavLink>


            </nav>
        </div>
    );
}
