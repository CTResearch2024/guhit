import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Display the 'Verified Account' text if the user is verified */}
                    {auth.user.is_verified === 1 && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                            <p className="font-bold">Verified Account</p>
                            <p>Your account is verified. You now have access to premium functions.</p>
                        </div>
                    )}

                    {/* Conditional alert box for unverified users */}
                    {auth.user.is_verified === 0 && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                            <p className="font-bold">Get Verified</p>
                            <p>Get your account verified to access premium functions.</p>
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-4xl"
                            user={auth.user}
                            wallet_address={auth.user.wallet_address}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
