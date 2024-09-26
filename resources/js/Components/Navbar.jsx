import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Navbar({ auth }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search Query:", searchQuery);
    };

    return (
        <nav className="bg-rose-800 text-black shadow-md py-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side: Logo */}
                <div className="flex items-center">
                    <img src="/img/logo2.png" alt="Logo" className="h-10 w-auto mr-4" />
                    <span className="font-semibold text-xl">ARTCHAIN</span>
                </div>

                {/* Middle: Search Bar */}
                <div className="flex-grow mx-6">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search for collections, NFTs or users"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute left-3 top-3 text-gray-400">/</span>
                    </form>
                </div>

                {/* Right side: Links and User Icon */}
                <ul className="flex items-center space-x-4">
                    <li><Link href="/create" className="hover:text-gray-700">Create</Link></li>
                    <li><Link href="/explore" className="hover:text-gray-700">Explore</Link></li>
                    <li><Link href="/sell" className="hover:text-gray-700">Sell</Link></li>
                    <li><Link href="/nfts" className="hover:text-gray-700">NFTs</Link></li>

                    {/* Conditional Rendering: Connect Button or User Icon */}
                    {!auth.user ? (
                        // Use a Link component to handle redirection
                        <Link
                            href={route('register')} // Use the route helper to route to the register page
                            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Connect
                        </Link>
                    ) : (
                        // Show User Icon with Dropdown if the user is logged in
                        <li 
                            className="relative group"
                            onMouseEnter={() => setIsDropdownOpen(true)} 
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <FaUser className="text-xl cursor-pointer" />
                            {isDropdownOpen && (
                                <div 
                                    className="absolute bg-white text-black p-2 rounded shadow-lg z-50"
                                    style={{ right: '0', top: '100%' }}
                                >
                                    <Link href={route('dashboard')} className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
                                    <Link href={route('logout')} method="post" className="block px-4 py-2 hover:bg-gray-200">Logout</Link>
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
