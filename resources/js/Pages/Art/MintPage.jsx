import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Web3 from 'web3';
import contractABI from '../../../../contracts/ArtNFT.json';
import guhitTokenABI from '../../../../contracts/GAC.json';  
import axios from 'axios';

export default function MintPage({ auth, artwork }) {
    const [formData, setFormData] = useState({
        artist_name: auth.user.name,  // Default to full name
        title: '',
        description: '',
        medium: '',
        size_length: '',
        size_width: '',
        material: '',
        price: '',
        completion_date: '',
    });

    const [useUsername, setUseUsername] = useState(false); 
    const [imageSize, setImageSize] = useState({ width: '', height: '' });
    const [isMinting, setIsMinting] = useState(false);

    const [showImageModal, setShowImageModal] = useState(false); // State to handle image modal

    const convertPixelsToCm = (pixels, dpi = 72) => {
        return (pixels / 96) * 2.54;  // Convert pixels to cm
    };
    
    const getImageDimensions = () => {
        const img = new Image();
        img.src = `/storage/${artwork.image_name}`; // The image path from the artwork object
    
        img.onload = () => {
            const widthInCm = convertPixelsToCm(img.width);
            const heightInCm = convertPixelsToCm(img.height);
    
            setImageSize({
                width: widthInCm.toFixed(2),  // Round to 2 decimal places
                height: heightInCm.toFixed(2),
            });
    
            setFormData({
                ...formData,
                size_length: heightInCm.toFixed(2),
                size_width: widthInCm.toFixed(2),
            });
        };
    
        img.onerror = (err) => {
            console.error('Error loading image', err);
        };
    };
    

    // Call the function once the component is mounted to detect image size
    useEffect(() => {
        getImageDimensions(); // Fetch the image dimensions when the component loads
    }, []);

    useEffect(() => {
        setFormData({
            ...formData,
            artist_name: useUsername ? auth.user.username : auth.user.name,  // Toggle based on checkbox
        });
    }, [useUsername, auth.user.username, auth.user.name]);


    const handleImageClick = () => {
        setShowImageModal(true);
    };

    const closeModal = () => {
        setShowImageModal(false);
    };

    const artNftContractAddress = "0x4434b697fDDB7aFb77144d5b8e783B645621E26D"; // ArtNFT Contract Address
    const gacTokenContractAddress = "0xc6F4aABeb4AD8347d5A50e61c685bb97B89dDD16"; // GAC Token Contract Address

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                return accounts[0];
            } catch (error) {
                console.error('User denied account access');
            }
        } else {
            console.error('MetaMask not detected');
            alert('Please install MetaMask to use this feature.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = () => {
        setUseUsername(!useUsername);  // Toggle the checkbox state
    };

    const isFormComplete = () => {
        return (
            formData.artist_name &&
            formData.title &&
            formData.medium &&
            formData.size_length &&
            formData.size_width &&
            formData.material &&
            formData.completion_date &&
            formData.price
        );
    };

    const uploadImageToPinata = async (imageUrl) => {
        try {
            // Fetch the image from your server as a Blob or binary data
            const imageResponse = await axios.get(imageUrl, { responseType: 'blob' });
    
            const formData = new FormData();
            formData.append("file", imageResponse.data);  // Append the binary data
    
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    
            const res = await axios.post(url, formData, {
                maxContentLength: 'Infinity',
                headers: {
                    pinata_api_key: '69ec51e98cb95e695fd8',
                    pinata_secret_api_key: '341cf0dddee356eb5e48ff9393ea0c007fb5636e979a5208f2e9b14fc4470233',
                    "Content-Type": "multipart/form-data",
                },
            });
    
            console.log('Image IPFS Hash returned:', res.data.IpfsHash);
            return res.data.IpfsHash;  // This is the hash of the image
        } catch (error) {
            console.error('Error uploading image to Pinata:', error);
            return null;
        }
    };

    


// Upload metadata to Pinata (after image upload)
const uploadMetadataToPinata = async (imageIpfsHash) => {
    const metadata = {
        name: formData.title,
        description: formData.description,
        image: `ipfs://${imageIpfsHash}`,  // Using the IPFS URL of the uploaded image
        attributes: [
            { trait_type: "Artist", value: formData.artist_name },
            { trait_type: "Medium", value: formData.medium },
            { trait_type: "Size", value: `${formData.size_length} x ${formData.size_width} cm` },
            { trait_type: "Material", value: formData.material },
            { trait_type: "Completion Date", value: formData.completion_date },
            { trait_type: "Price", value: formData.price },
        ],
    };

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    try {
        const res = await axios.post(url, metadata, {
            headers: {
                pinata_api_key: '69ec51e98cb95e695fd8',
                pinata_secret_api_key: '341cf0dddee356eb5e48ff9393ea0c007fb5636e979a5208f2e9b14fc4470233',
            },
        });
        console.log('IPFS Hash returned for metadata:', res.data.IpfsHash);
        return res.data.IpfsHash;  // This is the hash of the metadata
    } catch (error) {
        console.error('Error uploading metadata to Pinata:', error);
        return null;
    }
};


    // Save Minted NFT to Database
    const saveMintedNftToDatabase = async (data) => {
        try {
            const response = await axios.post('/api/minted-nfts', data);
            console.log(response.data.message); // 'NFT Minted and Saved Successfully'
        } catch (error) {
            console.error('Error saving minted NFT:', error);
        }
    };

    const updateArtworkStatus = async (artworkId) => {
        try {
            const response = await axios.put(`/update-artwork-status/${artworkId}`);
            console.log(response.data.message); // "Artwork status updated successfully"
        } catch (error) {
            console.error('Error updating artwork status:', error);
        }
    };
    

    const mintArtwork = async (e) => {
        e.preventDefault();
    
        if (!isFormComplete()) {
            alert("Please complete all required fields.");
            return;
        }
    
        try {
            setIsMinting(true);
    
            // Upload image and metadata to IPFS, mint NFT as before
            const imageIpfsHash = await uploadImageToPinata(`/storage/${artwork.image_name}`);
            if (!imageIpfsHash) throw new Error("Image upload failed.");
    
            const metadataIpfsHash = await uploadMetadataToPinata(imageIpfsHash);
            if (!metadataIpfsHash) throw new Error("IPFS metadata upload failed.");
    
            const web3 = new Web3(window.ethereum);
            const userAddress = await connectWallet();
    
            if (!userAddress) {
                throw new Error('Failed to connect wallet. MetaMask may not be installed or the user denied access.');
            }
    
            const contract = new web3.eth.Contract(contractABI, artNftContractAddress);
            const GUHITTokenContract = new web3.eth.Contract(guhitTokenABI, gacTokenContractAddress);
            const tokenFee = "10"; 
            const totalTokenFee = web3.utils.toWei(tokenFee, 'ether');
    
            const networkId = parseInt(await web3.eth.net.getId());
            if (networkId !== 2442) {
                throw new Error(`Incorrect network. Expected Polygon zkEVM (2442), got: ${networkId}`);
            }
    
            // Approve GUHIT Tokens for minting
            await GUHITTokenContract.methods.approve(artNftContractAddress, totalTokenFee).send({
                from: userAddress,
                gasPrice: web3.utils.toWei('50', 'gwei')
            });
    
            // Mint the NFT
            const mintResult = await contract.methods.mint(1).send({
                from: userAddress,
                gas: 300000,
                gasPrice: web3.utils.toWei('30', 'gwei')
            });
    
            const tokenId = mintResult.events.Transfer.returnValues.tokenId.toString();
            const transactionHash = mintResult.transactionHash;
    
            // Save the minted NFT to the database
            const mintedNftData = {
                name: formData.title,
                artist_name: formData.artist_name,
                medium: formData.medium,
                size: `${formData.size_length} x ${formData.size_width} cm`,
                material: formData.material,
                completion_date: formData.completion_date,
                price: formData.price,
                ipfs_hash: metadataIpfsHash,
                image_hash: imageIpfsHash,
                minted_by: userAddress,
                contract_address: artNftContractAddress,
                transaction_hash: transactionHash,
                token_id: tokenId,
            };
    
            await saveMintedNftToDatabase(mintedNftData);
    
            // After minting, update the status in tbl_submitted_artworks
            await updateArtworkStatus(artwork.id);
    
            alert('Minting and saving successful!');
        } catch (error) {
            console.error('Error during minting:', error);
            alert('Minting failed. Check console for details.');
        } finally {
            setIsMinting(false);
        }
    };
    
    
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mint Your Artwork</h2>}
        >
            <Head title="Mint Artwork" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Instructions Section */}
                        <div className="md:w-1/3">
                            <div className="bg-blue-100 text-blue-900 p-6 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Instructions</h2>
                                <ul className="list-disc list-inside">
                                    <li>Please review all the data carefully before proceeding.</li>
                                    <li>Once minted, the artwork's data cannot be altered.</li>
                                    <li>Ensure that the title, artist name, and completion date are correct.</li>
                                    <li>Make sure the dimensions and medium are accurate as they will be part of the metadata stored on the blockchain.</li>
                                    <li>If you have any issues, please contact support before minting.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Side: Image and Form */}
                        <div className="md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                            <div className="mb-4">
                                <img
                                    src={`/storage/${artwork.image_name}`}
                                    alt="Artwork"
                                    className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                                    onClick={handleImageClick} // Add this line to handle image click
                                />
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                            <form onSubmit={mintArtwork}>
                                <input type="hidden" name="artwork_id" value={artwork.id} />

                                <div className="mb-4 flex items-center justify-between">
                                <div className="w-full">
                                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                                Name of Artist <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="artist_name"
                                                required
                                                value={formData.artist_name}
                                                onChange={handleInputChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
    <div className="ml-4 mt-6">
        <label className="inline-flex items-center">
        <input
                                                    type="checkbox"
                                                    checked={useUsername}
                                                    onChange={(e) => setUseUsername(e.target.checked)}
                                                    className="form-checkbox"
                                                />
           <span className="ml-2 text-xs">Use Username Instead</span> 
        </label>
    </div>
</div>

                                {/* Artwork Title */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Artwork Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title of your artwork"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="(Optional) Add a description to your artwork"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="5"
                                    ></textarea>
                                </div>

                                {/* Medium */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Medium <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="medium"
                                        placeholder="Medium Used"
                                        required
                                        value={formData.medium}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                {/* Size */}
                                {/* Size Fields (Auto-Filled) */}
                                <div className="mb-4">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                            Size (length x width in cm) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="size_length"
                                                placeholder="Length in cm"
                                                required
                                                value={formData.size_length}
                                                onChange={handleInputChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <input
                                                type="text"
                                                name="size_width"
                                                placeholder="Width in cm"
                                                required
                                                value={formData.size_width}
                                                onChange={handleInputChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        
                                    </div>

                                {/* Material Used */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Material Used <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="material"
                                        placeholder="Material"
                                        required
                                        value={formData.material}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                {/* Date of Completion */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Date of Completion <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="completion_date"
                                        required
                                        value={formData.completion_date}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Price (in PHP) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter the price of your artwork"
                                        required
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                        step="0.01" // To allow decimal values for prices
                                    />
                                </div>


                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={!isFormComplete() || isMinting}
                                        className={`${
                                            isFormComplete() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                    >
                                        {isMinting ? 'Minting...' : 'Mint'}
                                    </button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        <img
                            src={`/storage/${artwork.image_name}`}
                            alt="Full Artwork"
                            className="max-w-full max-h-screen rounded-md"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 text-white bg-gray-800 hover:bg-gray-600 rounded-full px-2 py-1 m-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
