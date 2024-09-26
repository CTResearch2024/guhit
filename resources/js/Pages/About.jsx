import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';  
import Breadcrumb from '../Components/Breadcrumb';
import Footer from '../Components/Footer';

export default function About({ auth }) {
    return (
        <>
            <Head title="About Us" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
                
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Breadcrumb */}
                <Breadcrumb currentPage="About Us" />

                {/* Main Content */}
                <div className="container mx-auto p-8">
                    <div className="flex flex-col md:flex-row items-center mb-16">
                        {/* Image Section */}
                        <div className="md:w-1/2 p-4">
                            <img src="/img/team/team-1.jpg" alt="Team" className="rounded-lg shadow-lg w-full" />
                        </div>

                        {/* Text Section */}
                        <div className="md:w-1/2 p-4">
                            <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">
                                Empowering Filipino Artists and Envisioning the Philippines as the Art Capital of Asia
                            </h2>
                            <p className="text-lg text-black dark:text-white mb-6">
                                GUHIT Pinas, Inc. is a registered non-profit organization dedicated to advancing the visual arts in the Philippines. 
                                We strive to foster a vibrant artistic community and offer opportunities for artists of all backgrounds.
                            </p>
                            <ul className="list-none mb-6 space-y-2">
                                <li className="flex items-center">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                    Supporting artists of all ages, genders, and skill levels.
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                    Providing a platform for exposure and engagement.
                                </li>
                                <li className="flex items-center">
                                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                    Promoting artistic knowledge and skills through community and collaboration.
                                </li>
                            </ul>
                            <p className="text-lg text-black dark:text-white">
                                Since our inception on May 24, 2016, GUHIT Pinas has grown to a thriving community of over 688,000 members. 
                                We are committed to showcasing Filipino talent and creating a space where artists can share their work, 
                                learn from one another, and achieve recognition in the art world.
                            </p>
                        </div>
                    </div>

                    {/* Group Activity Section */}
                    <div className="bg-blue-100 p-8 rounded-lg mb-8">
                        <h2 className="text-3xl font-semibold text-black mb-4">Group Activity</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            GUHIT Pinas is highly active with numerous posts and interactions daily. Our community continuously grows and engages in discussions about visual arts.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                            <li><strong>22</strong> new posts today</li>
                            <li><strong>1,412</strong> posts in the last month</li>
                            <li><strong>688,119</strong> total members</li>
                            <li><strong>+1,273</strong> new members in the last week</li>
                            <li>Created <strong>8 years ago</strong></li>
                        </ul>
                    </div>

                    {/* Group Rules Section */}
                    <div className="bg-gray-100 p-8 rounded-lg">
                        <h2 className="text-3xl font-semibold text-black mb-4">Group Rules</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            To ensure a respectful and constructive environment, please adhere to the following rules:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                            <li>Always mention the tools/materials/software used in your artwork captions. Incomplete or improper captions are not allowed.</li>
                            <li>Post texts, photos, or videos directly. Reshared content from other sources will be removed.</li>
                            <li>Ensure your posts are set to "public" so they can be viewed by admins and other members.</li>
                            <li>Do not include reshared content or posts with a "CONTACT SELLER" prompt.</li>
                            <li>Clearly indicate whether your artwork is manually drawn, edited, photo-manipulated, smudged, or traced, and mention specific tools/software used.</li>
                            <li>Posts with profanity, strong language, or elements of sensuality are not allowed.</li>
                            <li>Artworks should be at least 20% completed before posting.</li>
                            <li>Ensure your photos or videos are in the correct orientation for better presentation.</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

