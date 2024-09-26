import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaCalendarAlt, FaTag, FaGavel, FaUsers, FaEye, FaHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Icons for auction
import { Inertia } from '@inertiajs/inertia';

export default function NFTDetails({ auth, nft, auctionData, bids }) {
    const initialPrice = auctionData?.initial_price ?? 'No price available';
    const startDate = auctionData?.start_date ?? 'Start date not set';
    const endDate = auctionData?.end_date ?? 'End date not set';

    const [detailsVisible, setDetailsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [offerPrice, setOfferPrice] = useState(''); // Offer price state
    const [timeLeft, setTimeLeft] = useState(null); // State to store time left

    const toggleDetails = () => {
        setDetailsVisible(!detailsVisible);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOfferSubmit = (e) => {
        e.preventDefault();
        Inertia.post(`/auction/${auctionData.id}/bid`, {
            bid_amount: offerPrice
        }, {
            onSuccess: () => {
                closeModal(); // Close the modal after successful submission
                setOfferPrice(''); // Clear the input field
            }
        });
    };

    // Calculate the time left for the auction
    useEffect(() => {
        if (endDate) {
            const calculateTimeLeft = () => {
                const now = new Date().getTime();
                const end = new Date(endDate).getTime();
                const difference = end - now;

                if (difference > 0) {
                    const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
                    setTimeLeft(hoursLeft);
                } else {
                    setTimeLeft(0); // Auction has ended
                }
            };

            // Call the function once and set an interval to update the time left every minute
            calculateTimeLeft();
            const timer = setInterval(calculateTimeLeft, 60000); // Update every 60 seconds

            return () => clearInterval(timer); // Cleanup the interval on component unmount
        }
    }, [endDate]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`NFT Details - ${nft.name}`} />
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - NFT Image */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 relative">
                        <img
                            src={`https://gateway.pinata.cloud/ipfs/${nft.image_hash}`}
                            alt={nft.name}
                            className="w-full h-auto rounded-md"
                        />
                        {/* Favorite Heart Icon */}
                        <div className="absolute top-2 right-2 text-red-500">
                            <FaHeart className="text-2xl cursor-pointer" />
                        </div>
                    </div>

                    {/* Right Side - Auction Details */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{nft.name}</h2>

                        {/* Owners, Views, Favorites in a single row */}
                        <div className="flex space-x-6 text-gray-600 dark:text-gray-300 mb-4">
                            <div className="flex items-center">
                                <FaUsers className="mr-1" /> 4 owners
                            </div>
                            <div className="flex items-center">
                                <FaEye className="mr-1" /> 1.5K views
                            </div>
                            <div className="flex items-center">
                                <FaHeart className="mr-1" /> 42 favorites
                            </div>
                        </div>

                        {/* Auction Details */}
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-md mb-6">
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                                <FaGavel className="inline-block mr-2" /> Auction Details
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <FaTag className="inline-block mr-2" /> Starting Price: ₱ {initialPrice}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <FaCalendarAlt className="inline-block mr-2" /> Start Date: {startDate}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <FaCalendarAlt className="inline-block mr-2" /> End Date: {endDate}
                            </p>

                            {/* Display the remaining time for the auction */}
                            {timeLeft !== null && (
                                <p className="text-sm text-red-600 font-bold">
                                    Time Left: {timeLeft > 0 ? `${timeLeft} hours remaining` : 'Auction has ended'}
                                </p>
                            )}

                            <div className="flex space-x-4 mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Buy Now
                                </button>
                                <button
                                    onClick={openModal} // Open the modal
                                    className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded"
                                >
                                    Make Offer
                                </button>
                            </div>
                        </div>

                        {/* Placeholder for additional sections */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-md">
                            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Price History</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">No price history available yet.</p>
                        </div>
                    </div>
                </div>

                <div className="flex mt-6">
                    {/* Description and Details Section */}
                    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        {/* Description Section */}
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Description</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {nft.description ?? 'No description available for this NFT.'}
                            </p>
                        </div>
                        {/* Details Dropdown Section */}
                        <div className="cursor-pointer bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-md">
                            <div className="flex justify-between items-center" onClick={toggleDetails}>
                                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                                    {detailsVisible ? (
                                        <FaChevronUp className="inline-block mr-2" />
                                    ) : (
                                        <FaChevronDown className="inline-block mr-2" />
                                    )}
                                    Details
                                </h3>
                            </div>
                            {detailsVisible && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <strong>Artist:</strong> {nft.artist_name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <strong>Medium:</strong> {nft.material}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <strong>Size:</strong> {nft.size}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <strong>Completion Date:</strong> {nft.completion_date}
                                    </p>
                                    <a
  href={`https://ipfs.io/ipfs/${nft.ipfs_hash}`}
  target="_blank"
  className="text-blue-500 underline block mt-2"
>
  View NFT Metadata
</a>

                                </div>
                            )}
                        </div>
                        
                    </div>

                    {/* Bidding Listing Section */}
                    <div className="w-2/3 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 ml-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Bidding Listings</h3>

                        {bids && bids.length > 0 ? (
                            <ul className="space-y-4">
                                {bids.map((bid) => (
                                    <li key={bid.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-md">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    <strong>Bidder:</strong> {bid.user.name}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    <strong>Offer:</strong> ₱ {bid.bid_amount}
                                                </p>
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                <p>{new Date(bid.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">No current bids available.</p>
                        )}
                    </div>
                </div>

                {/* Modal for Make Offer */}
                {isModalOpen && (
                                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                </div>
                
                                                <div className="bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Make an Offer</h3>
                                                        <form onSubmit={handleOfferSubmit}>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Enter your offer (₱):
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={offerPrice}
                                                                onChange={(e) => setOfferPrice(e.target.value)}
                                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                                                min="0"
                                                                required
                                                            />
                                                            <div className="mt-4 flex justify-end space-x-2">
                                                                <button
                                                                    type="submit"
                                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                                                >
                                                                    Submit Offer
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={closeModal}
                                                                    className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </AuthenticatedLayout>
                    );
                }
                
