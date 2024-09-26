import { Head, useForm } from '@inertiajs/react';
import { FaInfoCircle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaCheck } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';  // Add this for Inertia redirection
import { useState } from 'react';

export default function GetVerifiedPage({ className = '', user }) {
    const { data, setData, post, errors } = useForm({
        portfolio_url: '',
        identification_document: null,
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        tiktok: ''
    });

    const handleFileChange = (e) => {
        setData('identification_document', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('artist-verification.store')); // Submits the form to the Laravel route
    };

    const [showPortfolioTooltip, setShowPortfolioTooltip] = useState(false);
    const [showIdTooltip, setShowIdTooltip] = useState(false);

    const hrStyle = {
        border: '0',
        height: '1px',
        backgroundImage: 'linear-gradient(to right, red, yellow, red)',
        margin: '20px 0',
    };

    return (
        <section className={className}>
            <Head title="Get Verified" />
            <div className="py-12 bg-rose-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                                <h2 className="text-xl font-bold mb-4">Portfolio</h2>
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        Portfolio URL
                                        <FaInfoCircle
                                            className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
                                            onMouseEnter={() => setShowPortfolioTooltip(true)}
                                            onMouseLeave={() => setShowPortfolioTooltip(false)}
                                        />
                                    </label>
                                    {showPortfolioTooltip && (
                                        <div className="absolute top-0 right-20 z-10 p-2 w-60 bg-blue-100 border border-blue-500 rounded-md text-sm shadow-lg">
                                            A portfolio is a collection of your work, typically hosted online.
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="https://yourportfolio.com"
                                        value={data.portfolio_url}
                                        onChange={(e) => setData('portfolio_url', e.target.value)}
                                    />
                                </div>

                                <hr style={hrStyle} />

                                <h2 className="text-xl font-bold mb-4">Identification</h2>
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        Identification Document
                                        <FaInfoCircle
                                            className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
                                            onMouseEnter={() => setShowIdTooltip(true)}
                                            onMouseLeave={() => setShowIdTooltip(false)}
                                        />
                                    </label>
                                    {showIdTooltip && (
                                        <div className="absolute top-0 right-20 z-10 p-2 w-60 bg-blue-100 border border-blue-500 rounded-md text-sm shadow-lg">
                                            Upload a government-issued ID (e.g., passport, driver's license).
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <hr style={hrStyle} />

                                <h2 className="text-xl font-bold mb-4">Social Media</h2>
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700">Facebook</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="mt-1 block w-full pl-3 pr-10 border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Facebook URL"
                                            value={data.facebook}
                                            onChange={(e) => setData('facebook', e.target.value)}
                                        />
                                        <FaFacebook className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600" />
                                    </div>
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700">Twitter</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="mt-1 block w-full pl-3 pr-10 border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Twitter URL"
                                            value={data.twitter}
                                            onChange={(e) => setData('twitter', e.target.value)}
                                        />
                                        <FaTwitter className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-400" />
                                    </div>
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700">Instagram</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            className="mt-1 block w-full pl-3 pr-10 border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Instagram URL" 
                                            value={data.instagram}
                                            onChange={(e) => setData('instagram', e.target.value)}
                                        />
                                        <FaInstagram className="absolute top-1/2 right-3 transform -translate-y-1/2 text-pink-500" />
                                    </div>
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            className="mt-1 block w-full pl-3 pr-10 border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="LinkedIn URL" 
                                            value={data.linkedin}
                                            onChange={(e) => setData('linkedin', e.target.value)}
                                        />
                                        <FaLinkedin className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-700" />
                                    </div>
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700">TikTok</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            className="mt-1 block w-full pl-3 pr-10 border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="TikTok URL" 
                                            value={data.tiktok}
                                            onChange={(e) => setData('tiktok', e.target.value)}
                                        />
                                        <FaTiktok className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black" />
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <FaCheck className="mr-2" /> Submit Verification
                                    </button>

                                    <button
    type="button"
    onClick={() => Inertia.visit(route('profile.edit'))}  // Use Inertia.visit for navigation
    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-300"
>
    Back to Profile
</button>

                                </div>
                            </form>
                        </div>

                         {/* Right Column (Instructions) */}
                        <div className="p-6 bg-sky-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 shadow sm:rounded-lg">
                            <div className="flex items-center mb-4">
                                <h1 className="text-3xl font-bold">Get Verified</h1>
                                <img 
                                    src="img/verified_icon3.png" 
                                    alt="Verified Icon" 
                                    className="ml-1 w-12 h-12" // Adjust size and spacing as needed
                                />
                            </div>
                            <ul className="list-disc pl-5 text-lg mb-6">
                                <li className="mb-2">
                                    To verify your profile, upload your identification document and provide a portfolio URL.
                                </li>
                                <li className="mb-2">
                                    Add social media links to verify your identity and enhance credibility. 
                                    <span className="text-red-600 font-semibold"> You must provide at least one link </span>
                                    from Facebook, Twitter, Instagram, or TikTok.
                                </li>
                                <li className="mb-2">
                                    Ensure all documents and information are accurate and legitimate.
                                </li>
                                <li className="mb-2">
                                    Our team will review your submission and contact you as soon as possible.
                                </li>
                                <li>
                                    Verification establishes trust and credibility with potential buyers and collaborators.
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
