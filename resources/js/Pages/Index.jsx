import { Head, Link } from '@inertiajs/react'; // Import Link component
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs'; // Three-dot menu icon

export default function Index({ auth, carouselImages = [], nfts = [], openAuctionNfts = [] }) {
    const [nftDetails, setNftDetails] = useState([]);
    const [latestNfts, setLatestNfts] = useState([]);
    

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
                    };
                } catch (error) {
                    console.error('Error fetching NFT metadata:', error);
                    return nft; // Return the original NFT if there’s an error
                }
            });

            const details = await Promise.all(detailsPromises);
            setNftDetails(details);

            // Filter for latest NFTs created within 7 days
            const currentTime = new Date();
            const filteredLatestNfts = details.filter((nft) => {
                const createdAt = new Date(nft.created_at);
                const timeDiff = (currentTime - createdAt) / (1000 * 3600 * 24); // Time difference in days
                return timeDiff <= 7;
            });

            setLatestNfts(filteredLatestNfts);
        };

        fetchNftDetails();
    }, [nfts]);

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Full-width carousel section */}
                <div className="-mx-8 z-10">
                    {carouselImages.length > 0 ? (
                        <Swiper
                            spaceBetween={0}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            style={{ width: '100vw' }}
                        >
                            {carouselImages.map((image) => (
                                <SwiperSlide key={image.id}>
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={image.alt_text}
                                        className="w-full h-96 object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p>No carousel images available</p>
                    )}
                </div>

                {/* Open for Auction Section */}
                <div className="container mx-auto bg-white/80 dark:bg-gray-800/80 p-4 mt-4 mb-4 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-8">Open for Auction</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {openAuctionNfts.length > 0 ? (
                            openAuctionNfts.map((nft) => (
                                <Link href={route('nft.details', nft.id)} key={nft.id} className="block">
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-2 relative">
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
                                                                        href="#"
                                                                        className={`${
                                                                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                    >
                                                                        Make Offer
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={`${
                                                                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                    >
                                                                        Buy Now
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
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

                                        <img
        src={`https://gateway.pinata.cloud/ipfs/${nft.image_hash}`}
        alt={nft.name}
        className="w-full h-48 object-cover rounded-lg"
    />
                                        <div className="p-2">
                                        <h3 className="text-sm font-semibold">{nft.name}</h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Artist: {nft.artist_name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Medium: {nft.material}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Size: {nft.size}</p>

                                            <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                                                <a
                                                    href={`https://cardona-zkevm.polygonscan.com/tx/${nft.transaction_hash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-500 hover:underline"
                                                >
                                                    Minted by
                                                </a>
                                                <div className="text-xs font-bold">
                                                    {nft.price || '10 GAC'}
                                                </div>

                                                {/* Heart icon for liking */}
                                                <div className="absolute bottom-2 left-2">
                                                    <AiOutlineHeart className="text-red-500 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-4 text-center">No NFTs currently open for auction.</p>
                        )}
                    </div>
                </div>

                {/* Latest Minted NFTs Section */}
                <div className="container mx-auto bg-white/80 dark:bg-gray-800/80 p-4 mt-4 mb-4 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-8">Latest Minted NFTs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {latestNfts.length > 0 ? (
                            latestNfts.map((nft) => (
                                <Link href={route('nft.details', nft.id)} key={nft.id} className="block">
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-2 relative">
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
                                                                        href="#"
                                                                        className={`${
                                                                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                    >
                                                                        Make Offer
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={`${
                                                                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                    >
                                                                        Buy Now
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
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

                                        <img
                                            src={nft.image}
                                            alt={nft.name}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="p-2">
                                            <h3 className="text-sm font-semibold">{nft.name}</h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Artist: {nft.artist_name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Medium: {nft.material}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Size: {nft.size}</p>

                                            <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                                                <a
                                                    href={`https://cardona-zkevm.polygonscan.com/tx/${nft.transaction_hash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-500 hover:underline"
                                                >
                                                    Minted by
                                                </a>
                                                <div className="text-xs font-bold">
                                                    {nft.price || '10 GAC'}
                                                </div>

                                                {/* Heart icon for liking */}
                                                <div className="absolute bottom-2 left-2">
                                                    <AiOutlineHeart className="text-red-500 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-4 text-center">No recent NFTs.</p>
                        )}
                    </div>
                </div>

                {/* NFTs section inside a container */}
                <div className="container mx-auto bg-white/80 dark:bg-gray-800/80 p-4 mt-4 mb-4 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-8">All Minted NFTs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {nftDetails.length > 0 ? (
                            nftDetails.map((nft) => (
                                <Link href={route('nft.details', nft.id)} key={nft.id} className="block">
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-4 relative">
                                        {/* Three-dot menu on the top right */}
                                        <div className="absolute top-4 right-4">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex justify-center w-full">
                                                        <BsThreeDotsVertical className="w-6 h-6 text-gray-600 dark:text-gray-400" />
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
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={`${
                                                                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                    >
                                                                        Make Offer
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={`${
                                                                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                                                    >
                                                                        Buy Now
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
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

                                        <img
                                            src={nft.image}
                                            alt={nft.name}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                        <div className="p-4">
                                        <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{nft.name}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Artist: {nft.artist_name}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Medium: {nft.medium}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Size: {nft.size}</p>

                                            {/* Minting status and price */}
                                            <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                                                <a
                                                    href={`https://cardona-zkevm.polygonscan.com/tx/${nft.transaction_hash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Minted by
                                                </a>
                                                <div className="text-sm font-bold">
                                                    {nft.price || '10 GAC'}
                                                </div>

                                                {/* Heart icon for liking */}
                                                <div className="absolute bottom-4 left-4">
                                                    <AiOutlineHeart className="text-red-500 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-4 text-center">No NFTs minted yet.</p>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}


