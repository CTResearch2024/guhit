import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { FaUser, FaEnvelope, FaSave, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', wallet_address }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        profile_image: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_image', file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('username', data.username);
        formData.append('email', data.email);

        if (data.profile_image) {
            formData.append('profile_image', data.profile_image);
        }

        formData.append('_method', 'patch');

        Inertia.post(route('profile.update'), formData, {
            forceFormData: true,
            onSuccess: () => {
                console.log('Profile updated successfully');
            },
            onError: (errors) => {
                console.log('Error updating profile:', errors);
            }
        });
    };

    const fileInputStyle = {
        width: '200px',
        padding: '8px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        fontSize: '0.875rem',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
    };

    const walletAddressStyle = {
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        color: '#6c757d',
        cursor: 'not-allowed',
    };

    const handleGetVerified = () => {
        console.log('Redirecting to Get Verified page');
        Inertia.get(route('verification.page'));
    };

    const inputWithIconStyle = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '6px',
        paddingLeft: '10px',
    };

    const separatorStyle = {
        marginLeft: '10px',
        marginRight: '10px',
        color: '#ccc',
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <div className="flex flex-wrap">
    <div className="w-full md:w-2/3 pr-4"> {/* Adjust width for better balance */}
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="relative mb-4">
                <InputLabel htmlFor="name" value="Name" />
                <div className="relative flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaUser className="text-blue-500" />
                    </span>
                    <span className="absolute inset-y-0 left-10 flex items-center pl-1 border-l border-gray-300"></span>
                    <input
                        id="name"
                        className="pl-16 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                </div>
                <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="relative mb-4">
                <InputLabel htmlFor="username" value="Username" />
                <div className="relative flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaUser className="text-blue-500" />
                    </span>
                    <span className="absolute inset-y-0 left-10 flex items-center pl-1 border-l border-gray-300"></span>
                    <input
                        id="username"
                        className="pl-16 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <InputError className="mt-2" message={errors.username} />
            </div>

            <div className="relative mb-4">
                <InputLabel htmlFor="email" value="Email" />
                <div className="relative flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaEnvelope className="text-red-500" />
                    </span>
                    <span className="absolute inset-y-0 left-10 flex items-center pl-1 border-l border-gray-300"></span>
                    <input
                        id="email"
                        type="email"
                        className="pl-16 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="relative mb-4">
                <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
                <div className="relative flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <img src="/img/metamask.svg" alt="Metamask Icon" className="w-5 h-5" />
                    </span>
                    <span className="absolute inset-y-0 left-10 flex items-center pl-1 border-l border-gray-300"></span>
                    <input
                        type="text"
                        className="pl-16 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        value={wallet_address}
                        readOnly
                    />
                </div>
            </div>

<div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing} className="flex items-center">
                                <FaSave className="mr-2" /> Save
                            </PrimaryButton>

                            {/* Conditionally render Get Verified button if is_verified is 0 */}
                            {user.is_verified === 0 && (
                                <PrimaryButton
                                    type="button"
                                    onClick={handleGetVerified}
                                    className="ml-4 bg-green-600 hover:bg-green-700 text-white flex items-center"
                                >
                                    <FaCheck className="mr-2" /> Get Verified
                                </PrimaryButton>
                            )}
                        </div>
        </form>
    </div>

    <div className="w-full md:w-1/3 pl-4 flex flex-col justify-center items-center">
    {user.profile_image && (
        <button onClick={openModal}>
                <img
                    src={`/storage/${user.profile_image}`}
                    alt="Profile"
                    className="rounded-full h-48 w-48 object-cover border-4 shadow-md"
                    style={{
                        background: 'linear-gradient(to right, #6EE7B7, #3B82F6)',
                        padding: '4px',
                        borderRadius: '9999px',
                        backgroundClip: 'border-box',
                    }}
                />
            </button>
    )}

{/* Modal */}
{isModalOpen && (
  <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white rounded-lg shadow-lg p-6" style={{ maxWidth: '600px', width: '100%' }}>
      <div className="flex justify-center">
        <img
          src={`/storage/${user.profile_image}`}
          alt="Profile Large"
          className="rounded-full w-72 h-72 object-cover border-4 shadow-md"
          style={{
            background: 'linear-gradient(to right, #6EE7B7, #3B82F6)',
            padding: '4px',
            borderRadius: '9999px',
            backgroundClip: 'border-box',
          }}
        />
      </div>
      <div className="flex justify-end mt-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



    <div className="w-full flex flex-col items-center mt-4">
        
        {/* Styled the label as a button for the file input */}
        <label
            htmlFor="profile_image"
            className="cursor-pointer bg-white text-gray-700 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mt-2" // Styled button
        >
            Select New Profile Image
        </label>
        
        {/* Hidden file input that triggers when the label is clicked */}
        <input
            id="profile_image"
            type="file"
            className="hidden"
            onChange={handleFileChange}
        />
        
        {/* Show file name or placeholder if no file is chosen */}
        <p className="ml-2 text-gray-500 mt-2">{data.profile_image ? data.profile_image.name : "No file chosen"}</p>
    </div>
</div>

</div>

        </section>
    );
}
