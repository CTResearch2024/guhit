import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';  
import Breadcrumb from '../Components/Breadcrumb';
import Footer from '../Components/Footer';

export default function Events({ auth }) {
    return (
        <>
            <Head title="Events" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
                
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Breadcrumb */}
                <Breadcrumb currentPage="Events" />

                {/* Main Content */}
                <div className="container mx-auto p-8">
                    <div className="mb-16">
                        {/* Introduction Section */}
                        <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">Upcoming Events</h2>
                        <p className="text-lg text-black dark:text-white mb-8">
                            Stay tuned for updates on our upcoming events. We host a variety of workshops, exhibitions, and community engagements
                            to bring together artists and enthusiasts. Check back later for more information on how you can participate and
                            showcase your talent.
                        </p>
                    </div>

                    {/* Placeholder for Event Listings */}
                    <div className="bg-gray-100 p-8 rounded-lg">
                        <h3 className="text-2xl font-semibold text-black mb-4">No Events Currently Scheduled</h3>
                        <p className="text-lg text-gray-700">
                            At the moment, there are no upcoming events. Please check back soon, or sign up for our newsletter to receive the latest updates on our events.
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
