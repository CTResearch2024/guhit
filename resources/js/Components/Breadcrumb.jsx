import { Link } from '@inertiajs/react';

export default function Breadcrumb({ currentPage }) {
    return (
        <div className="bg-blue-100 py-6">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-black">{currentPage}</h1>
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600">
                    <Link href="/" className="text-blue-500">Home</Link> / {currentPage}
                </div>
            </div>
        </div>
    );
}


