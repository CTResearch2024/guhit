import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUndoAlt } from 'react-icons/fa'; // Importing reset/undo icon

export default function MyArtworks({ auth, artworks }) {
    const [selectedArtwork, setSelectedArtwork] = useState(null); // Selected artwork for modal
    const [fromDate, setFromDate] = useState(''); // From date filter
    const [toDate, setToDate] = useState(''); // To date filter

    const { delete: destroy, processing } = useForm(); // Setup for handling delete request

    // Function to handle card click
    const handleCardClick = (artwork) => {
        setSelectedArtwork(artwork);
    };

    // Function to close modal
    const closeModal = () => {
        setSelectedArtwork(null);
    };

    // Function to reset date filters
    const resetDateFilters = () => {
        setFromDate('');
        setToDate('');
    };

    // Function to handle delete action
    const handleDelete = (artworkId) => {
        if (confirm("Are you sure you want to delete this artwork?")) {
            destroy(`/artworks/${artworkId}/delete`, {
                onSuccess: () => closeModal(), // Close the modal upon success
            });
        }
    };

    // Filter artworks by date range
    const filteredArtworks = artworks.filter((artwork) => {
        const submissionDate = new Date(artwork.created_at);
        const fromDateObject = fromDate ? new Date(fromDate) : null;
        const toDateObject = toDate ? new Date(toDate) : null;

        // Set the To date to the end of the selected day (23:59:59) for accurate comparison
        if (toDateObject) {
            toDateObject.setHours(23, 59, 59, 999); // Set time to the end of the day
        }

        // Check if the submission date is within the selected date range
        if (fromDateObject && submissionDate < fromDateObject) return false;
        if (toDateObject && submissionDate > toDateObject) return false;

        return true;
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My Artworks</h2>}
        >
            <Head title="My Artworks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Date filter inputs */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">Your Submitted Artworks</h1>

                                <div className="flex space-x-4 items-center">
                                    <div>
                                        <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
                                        <input
                                            type="date"
                                            id="fromDate"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
                                        <input
                                            type="date"
                                            id="toDate"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {/* Reset Icon */}
                                    <button
                                        onClick={resetDateFilters}
                                        className="ml-2 mt-6 text-blue-300 hover:text-blue-600"
                                    >
                                        <FaUndoAlt size={16} /> {/* This will use the "Undo" or "Reset" icon */}
                                    </button>
                                </div>
                            </div>

                            {/* Horizontal line */}
                            <hr className="border-t border-gray-300 dark:border-gray-700 mb-6" />

                            {filteredArtworks.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredArtworks.map((artwork) => (
            <div
                key={artwork.id}
                onClick={() => handleCardClick(artwork)} // Make card clickable
                className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-xl"
            >
                <img
                    src={`/storage/${artwork.image_name}`}
                    alt="Artwork"
                    className="w-full h-36 object-cover rounded-md mb-3"
                />
                <div className="flex flex-col">
                    <span
                        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full text-white mb-2 ${
                            artwork.status_id === 1
                                ? 'bg-yellow-500'
                                : artwork.status_id === 2
                                ? 'bg-blue-500'
                                : artwork.status_id === 3
                                ? 'bg-red-500'
                                : 'bg-green-500'
                        }`}
                    >
                        {artwork.status}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Submitted on: {artwork.created_at ? new Date(artwork.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                    
                    {/* Display Mint button when status is approved
                    {artwork.status_id === 2 && (
                        <Link
                        href={`/mint/${artwork.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded w-full mt-4 text-center"
                    >
                        Mint
                    </Link>
                    )} */}
                </div>
            </div>
        ))}
    </div>
) : (
    <p className="text-center text-lg mt-6">No artworks found for the selected date range.</p>
)}
{/* Modal for selected artwork */}
{selectedArtwork && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">
                {selectedArtwork.status_id === 4
                    ? 'Your artwork is minted!'
                    : selectedArtwork.status_id === 3
                    ? 'Your artwork was rejected'
                    : selectedArtwork.status_id === 2
                    ? 'Your artwork is approved!'
                    : 'Artwork Information'}
            </h2>

            {/* Approved Artwork (Mint button) */}
            {selectedArtwork.status_id === 2 && (
                <div>
                    <p className="text-lg mb-4">
                        Your artwork has been approved. You can now mint it as an NFT.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <Link
                            href={`/mint/${selectedArtwork.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Mint
                        </Link>
                        <button
                            onClick={closeModal}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Minted Artwork */}
            {selectedArtwork.status_id === 4 && (
                <div>
                    <p className="text-lg mb-4">
                        Congratulations! Your artwork has been minted as an NFT.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <Link
                            href="/my-nfts"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            View My NFTs
                        </Link>
                        <button
                            onClick={closeModal}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Rejected Artwork */}
            {selectedArtwork.status_id === 3 && (
                <div>
                    <p className="text-lg mb-4">
                        Your artwork was rejected. Please upload a new artwork that complies with the guidelines.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <Link
                            href="/upload-art"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload New Artwork
                        </Link>
                        <button
                            onClick={() => handleDelete(selectedArtwork.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            disabled={processing} // Disable button while processing
                        >
                            {processing ? 'Deleting...' : 'Delete Artwork'}
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Pending Artwork */}
            {selectedArtwork.status_id === 1 && (
                <div>
                    <p className="text-lg mb-4">
                        Your artwork is being reviewed by the admins.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => handleDelete(selectedArtwork.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            disabled={processing} // Disable button while processing
                        >
                            {processing ? 'Deleting...' : 'Delete Artwork'}
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
)}



                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
