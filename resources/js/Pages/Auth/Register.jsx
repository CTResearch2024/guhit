import GuestLayout from '@/Layouts/GuestLayout';
import { FaGoogle } from 'react-icons/fa'; // Google icon
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function RegisterOrLogin() {
    const [walletAddress, setWalletAddress] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0];
                setWalletAddress(walletAddress);
                setWalletConnected(true);

                axios.post(route('register'), {
                    wallet_address: walletAddress,
                }).then(response => {
                    window.location.href = route('dashboard');
                }).catch(error => {
                    console.error(error.response.data);
                });

            } catch (error) {
                console.error('User denied account access');
            }
        } else {
            alert('Please install MetaMask to use this feature.');
        }
    };

    const handleGoogleSignIn = async () => {
        window.location.href = route('auth.google');
    };

    return (
        <GuestLayout>
            <Head title="Connect Wallet or Google Account" />

            <div className="p-10 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-6">Connect</h1>

                <div className="w-full max-w-md p-4 rounded-lg shadow-md bg-gray-800">
                    {/* MetaMask Connect Button */}
                    <button
                        onClick={connectWallet}
                        className="flex items-center justify-between w-full py-4 px-6 text-white bg-gray-700 rounded-lg mb-2 hover:bg-gray-600"
                    >
                        <span>MetaMask</span>
                        {walletConnected ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : <img src="img/metamask.svg" alt="MetaMask" className="w-6 h-6" />}
                    </button>

                    {/* Google Sign-In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-between w-full py-4 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
                    >
                        <span>Continue with Gmail</span>
                        <img src="img/google.png" alt="Gmail" className="w-6 h-6" />
                    </button>

                    <div className="text-sm text-gray-400 text-center mt-4">
                        By continuing you agree to our <a href="#" className="text-blue-500">Privacy Policy</a> and <a href="#" className="text-blue-500">Terms and Conditions</a>.
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
