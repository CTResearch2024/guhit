import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractABI from '../../../smartcontract/contractABI.json';
import axios from 'axios';

export default function AdminWithdrawPage({ auth }) {
    const [nftSettings, setNftSettings] = useState({});
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    useEffect(() => {
        async function fetchNFTSettings() {
            try {
                let response = await fetch('/nft-settings');  // Fetch settings from Laravel API
                let data = await response.json();
                setNftSettings(data);
            } catch (error) {
                console.error('Error fetching NFT settings:', error);
            }
        }
        fetchNFTSettings();
    }, []);

    // Withdraw funds function
    const withdrawFunds = async () => {
        try {
            setIsWithdrawing(true);

            const adminWallet = nftSettings.wallet_address;  // Get the admin wallet address from settings
            const web3 = new Web3(Web3.givenProvider);
            const userAddress = (await web3.eth.getAccounts())[0];
            const contract = new web3.eth.Contract(contractABI, nftSettings.contract_address);

            // Call the withdraw function on the smart contract
            await contract.methods.withdrawAll(adminWallet).send({ from: userAddress });

            alert('Withdrawal successful!');
        } catch (error) {
            console.error('Error withdrawing funds:', error);
            alert('Withdrawal failed.');
        } finally {
            setIsWithdrawing(false);
        }
    };

    return (
        <div>
            <h3>Admin Withdraw Funds</h3>
            <button
                onClick={withdrawFunds}
                disabled={isWithdrawing}
                className={`btn btn-primary ${isWithdrawing ? 'disabled' : ''}`}
            >
                {isWithdrawing ? 'Withdrawing...' : 'Withdraw Funds'}
            </button>
        </div>
    );
}
