import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import Navbar from '../Components/Navbar';  
import Breadcrumb from '../Components/Breadcrumb';
import Footer from '../Components/Footer';

export default function ContactUs({ auth, csrfToken }) {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);  // Add success state

    // Fetch the categories from the backend
    useEffect(() => {
        axios.get('/contact-categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        axios.post('/contact', formData)
            .then(response => {
                // Handle success
                setSuccess('Your message has been sent successfully!');  // Set success message
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    category: ''
                });
                setError(null);  // Clear any error
            })
            .catch(error => {
                // Handle error
                setError('An error occurred while sending your message.');
                setSuccess(null);  // Clear success message if there's an error
            });
    };

    return (
        <>
            <Head title="Contact Us" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
                
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Breadcrumb */}
                <Breadcrumb currentPage="Contact Us" />

                {/* Main Content */}
                <div className="container mx-auto p-8">
                    
                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-100 text-green-700 p-4 mb-6 rounded-lg">
                            {success}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Contact Information Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {/* Address, Email, and Call Us sections */}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="border border-gray-300 p-4 w-full rounded-lg"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="border border-gray-300 p-4 w-full rounded-lg"
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                className="border border-gray-300 p-4 w-full rounded-lg mb-4"
                                required
                            />

                            {/* Category Dropdown populated dynamically */}
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border border-gray-300 p-4 w-full rounded-lg mb-4"
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                className="border border-gray-300 p-4 w-full rounded-lg mb-4"
                                rows="6"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
