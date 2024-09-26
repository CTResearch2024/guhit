import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';  
import Breadcrumb from '../Components/Breadcrumb';
import Footer from '../Components/Footer';

export default function Announcements({ auth }) {
    return (
        <>
            <Head title="Announcements" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
                
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Breadcrumb */}
                <Breadcrumb currentPage="Announcements" />

                {/* Main Content */}
                <div className="container mx-auto p-8">
                    <div className="mb-16">
                        {/* Introduction Section */}
                        <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">Latest Announcements</h2>
                        <p className="text-lg text-black dark:text-white mb-8">
                            Stay updated with the latest announcements from GUHIT Pinas. Here, you can find information on important updates, new features, and organizational news.
                        </p>
                    </div>

                    {/* Placeholder for Announcement Listings */}
                    <div className="bg-gray-100 p-8 rounded-lg">
                        <h3 className="text-2xl font-semibold text-black mb-4">No Announcements Available</h3>
                        <p className="text-lg text-gray-700">
                            Currently, there are no new announcements. Please check back soon for the latest news and updates.
                        </p>
                        {/* Add a newsletter subscription CTA if needed */}
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
