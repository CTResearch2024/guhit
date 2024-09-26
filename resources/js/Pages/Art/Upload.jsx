import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react'; 
import { useState } from 'react';
import axios from 'axios';

export default function Upload({ auth }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { flash = {} } = usePage().props;

    const { data, setData } = useForm({
        image: null,
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setData('image', file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            console.log('Submit button clicked');
            console.log('Image data:', data.image);

            const formData = new FormData();
            formData.append('image', data.image);
            formData.append('user_id', auth.user.id);

            await axios.post('/submit-artwork', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            router.visit(route('my.artworks')); 
        } catch (error) {
            console.error('Error during image submission:', error);
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Upload Art</h2>}
        >
            <Head title="Upload Art" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                    {/* Instructions Section */}
                    <div className="md:w-1/3">
                        <div className="bg-blue-100 text-blue-900 p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Submission Guidelines:</h2>
                            <ul className="list-disc list-inside">
                                <li>The artwork must be your original creation. Uploading artworks that are copied from other artists will be rejected.</li>
                                <li>File Types: Only JPEG, PNG, or GIF formats are accepted.</li>
                                <li>Maximum File Size: 2MB.</li>
                                <li>If your artwork is inspired by or references another work, please ensure it is transformative and not a direct copy.</li>
                                <li>All submitted artworks will be reviewed by an admin. If approved, you will have the option to mint your artwork as an NFT.</li>
                                <li>Please double-check your submission before uploading. Once submitted, the artwork cannot be edited until it has been reviewed.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Upload Section */}
                    <div className="md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <h1 className="text-xl font-semibold mb-4">Upload Your Art</h1>

                            {/* Display Flash Messages */}
                            {flash.success && (
                                <div className="mb-4 text-green-600 dark:text-green-400">
                                    {flash.success}
                                </div>
                            )}
                            {flash.error && (
                                <div className="mb-4 text-red-600 dark:text-red-400">
                                    {flash.error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                                        Select an Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/gif"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    />
                                </div>

                                {selectedImage && (
                                    <div className="mt-4">
                                        <p className="text-gray-700 dark:text-gray-200">Preview:</p>
                                        <img
                                            src={selectedImage}
                                            alt="Selected"
                                            className="max-w-full h-auto rounded-lg border border-gray-300"
                                        />
                                    </div>
                                )}

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={loading}
                                    >
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
