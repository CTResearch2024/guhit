import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // Import Link for routing
import { useState, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { Menu, Transition } from '@headlessui/react';

export default function MyNFTs({ auth, nfts }) {
    const [nftDetails, setNftDetails] = useState([]);

    useEffect(() => {
        const fetchNftDetails = async () => {
            const detailsPromises = nfts.map(async (nft) => {
                try {
                    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${nft.ipfs_hash}`);
                    const data = await response.json();
                    return {
                        ...nft,
                        ...data, 
                        image: `https://gateway.pinata.cloud/ipfs/${data.image.replace('ipfs://', '')}`,
                        price: nft.price ?? 0,
                    };
                } catch (error) {
                    console.error('Error fetching NFT metadata:', error);
                    return { ...nft, price: nft.price ?? 0.00 };
                }
            });

            const details = await Promise.all(detailsPromises);
            setNftDetails(details);
        };

        fetchNftDetails();
    }, [nfts]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My NFTs</h2>}
        >
            <Head title="My NFTs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {nftDetails.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {nftDetails.map(nft => (
                                <div
                                    key={nft.id}
                                    className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-2 relative hover:shadow-lg transition-shadow duration-200"
                                >
                                    {/* Only the image and title redirect to the NFT details page */}
                                    <Link href={route('nft.details', nft.id)}>
                                        <img
                                            src={nft.image}
                                            alt={`Art for ${nft.name}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </Link>

                                    <div className="p-2">
                                        <Link href={route('nft.details', nft.id)}>
                                            <h3 className="text-sm font-semibold">{nft.name}</h3>
                                        </Link>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Artist: {nft.artist_name}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Medium: {nft.material}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Size: {nft.size}</p>

                                        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                                            <a
                                                href={`https://cardona-zkevm.polygonscan.com/tx/${nft.transaction_hash}`}
                                                target="_blank"
                                                className="text-xs text-blue-500 hover:underline"
                                            >
                                                Minted by
                                            </a>
                                            <div className="text-xs font-bold">
                                                ₱ {nft.price}
                                            </div>

                                            {/* Heart icon for liking */}
                                            <div className="absolute bottom-2 left-2">
                                                <AiOutlineHeart className="text-red-500 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu button should not be wrapped in the Link */}
                                    <div className="absolute top-2 right-2">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex justify-center w-full">
                                                    <BsThreeDotsVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href={route('auction.show', nft.id)} // Correct route for auction form
                                                                    className={`${
                                                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                    } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                >
                                                                    Auction This
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href={`https://ipfs.io/ipfs/${nft.ipfs_hash}`} 
                                                                    target="_blank"
                                                                    className={`${
                                                                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                    } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                >
                                                                    View Metadata
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No NFTs available.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
