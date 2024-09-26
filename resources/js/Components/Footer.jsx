import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-red-800 text-white py-8">
            <div className="container mx-auto px-4">
                {/* Newsletter Section */}
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-xl font-semibold mb-2">Our Newsletter</h2>
                    <p className="text-gray-300 mb-4">
                        Tamen quem nulla quae legam multos aute sint culpa legam noster magna
                    </p>
                    <div className="flex items-center w-full max-w-md">
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-l-lg text-black"
                            placeholder="Enter your email"
                        />
                        <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg font-semibold">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Useful Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
                        <ul>
                            <li className="mb-2"><a href="/" className="hover:text-gray-300">Home</a></li>
                            <li className="mb-2"><a href="/about" className="hover:text-gray-300">About us</a></li>
                            <li className="mb-2"><a href="/services" className="hover:text-gray-300">Services</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-300">Terms of service</a></li>
                            <li><a href="#" className="hover:text-gray-300">Privacy policy</a></li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Our Services</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-gray-300">Web Design</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-300">Web Development</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-300">Product Management</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-300">Marketing</a></li>
                            <li><a href="#" className="hover:text-gray-300">Graphic Design</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <p className="mb-2">Sta.Lucia</p>
                        <p className="mb-2">Sta.Ana, Philippines</p>
                        <p className="mb-2">
                            <strong>Phone:</strong> +(045) 409 1014 : 09190667236
                        </p>
                        <p>
                            <strong>Email:</strong>{' '}
                            <a href="mailto:info@holycrosscollegepampanga.edu.ph" className="hover:text-gray-300">
                                info@holycrosscollegepampanga.edu.ph
                            </a>
                        </p>
                    </div>

                    {/* About GUHIT Pinas */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">About GUHIT Pinas</h3>
                        <p className="text-gray-300 mb-4">
                            GUHIT Pinas, Inc. is a registered non-profit organization that envisions the Philippines as
                            the Art Capital of Asia. To achieve this, we commit to growing our community, improving our
                            artistic knowledge and skills, and creating and engaging in opportunities for exposure.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
                            <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
                            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
                            <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-red-900 py-4 mt-8">
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>
                        © Copyright 2024 <strong>ArtChain</strong>. All Rights Reserved
                    </p>
                    <p>Capstone Project</p>
                </div>
            </div>
        </footer>
    );
}
