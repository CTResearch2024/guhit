import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { FaTag, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'; // Add icons
import { MdOutlineDateRange } from 'react-icons/md'; // Add icons for dates

export default function AuctionForm() {
    const { nft } = usePage().props;
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const initialPrice = nft?.price ?? 0;
    const [price, setPrice] = useState(initialPrice);

    const { post, processing } = useForm({
        price: initialPrice,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(`/auction/start/${nft.id}`, {
            price,
            start_date: startDate,
            end_date: endDate,
        });
    };

    
        

    return (
        <AuthenticatedLayout user={usePage().props.auth.user}>
            <Head title="Auction NFT" />
  
            <div className="py-12 bg-gradient-to-r from-pink-100 to-blue-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left side - NFT Details */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6 relative">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Auction Your NFT</h2>
                            <div className="flex items-center">
                                <img
                                    src={`https://gateway.pinata.cloud/ipfs/${nft.image_hash}`}
                                    alt={nft.name}
                                    className="w-36 h-36 object-cover rounded-md shadow-md"
                                />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{nft.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Artist: {nft.artist_name}</p>
                                    <p className="text-gray-600 dark:text-gray-300">Medium: {nft.material}</p>
                                    <p className="text-gray-600 dark:text-gray-300">Size: {nft.size}</p>
                                    <p className="text-gray-600 dark:text-gray-300">Completion Date: {nft.completion_date}</p>
                                    <a
                                        href={`https://ipfs.io/ipfs/${nft.ipfs_hash}`}
                                        target="_blank"
                                        className="text-blue-500 underline mt-2 block"
                                    >
                                        View NFT Metadata
                                    </a>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FaTag className="inline-block mr-2" /> Set Initial Price (₱):
                                    </label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <MdOutlineDateRange className="inline-block mr-2" /> Start Date:
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FaCalendarAlt className="inline-block mr-2" /> End Date:
                                    </label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
                                >
                                    Start Auction
                                </button>
                            </form>
                        </div>

                        {/* Right side - Auction Information */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Auction Information</h2>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                <FaInfoCircle className="inline-block mr-2 text-blue-500" /> What is an Auction?
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                An auction is a process of selling items to the highest bidder. When you start an auction, buyers can place bids for your NFT, and after the set duration, the highest bid wins.
                            </p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                <FaInfoCircle className="inline-block mr-2 text-blue-500" /> How to Start an Auction?
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Set an initial price, select a start and end date for the auction, and click "Start Auction". Once the auction begins, it will be visible to potential buyers.
                            </p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                <FaInfoCircle className="inline-block mr-2 text-blue-500" /> Important Tips:
                            </p>
                            <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside">
                                <li>Choose a competitive starting price.</li>
                                <li>Ensure the end date gives enough time for bidders to participate.</li>
                                <li>Promote your auction to attract more attention.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
