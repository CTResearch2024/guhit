import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Web3 from 'web3';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        wallet_address: '',
        password: '',
        remember: false,
    });

    // Access flash messages from the server response
    const { error } = usePage().props?.flash || {};

    const [walletAddress, setWalletAddress] = useState('');

    // MetaMask wallet connection
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const connectedWalletAddress = accounts[0];
                setData('wallet_address', connectedWalletAddress); // Set wallet address in the form data
                setWalletAddress(connectedWalletAddress);
                console.log('Connected wallet address:', connectedWalletAddress);
            } catch (error) {
                console.error('User denied account access');
            }
        } else {
            console.error('MetaMask not detected');
            alert('Please install MetaMask to use this feature.');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Display flash error message if it exists */}
            {error && <div className="mb-4 font-medium text-sm text-red-600">{error}</div>}

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="wallet_address" value="Wallet Address" />

                    <TextInput
                        id="wallet_address"
                        type="text"
                        name="wallet_address"
                        value={data.wallet_address}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        isFocused={true}
                        onChange={(e) => setData('wallet_address', e.target.value)}
                        readOnly // Making the input read-only because wallet is connected via MetaMask
                    />

                    <InputError message={errors.wallet_address} className="mt-2" />

                    {/* Connect Wallet Button */}
                    <button
                        type="button"
                        onClick={connectWallet}
                        className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700"
                    >
                        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                    </button>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
