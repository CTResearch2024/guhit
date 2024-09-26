@php
    // Fetch the contract and wallet details from the nft_settings table
    $contractAddress = $crud->entry->contract_address;
    $walletAddress = $crud->entry->wallet_address;
    $tokenFee = $crud->entry->token_fee;
@endphp

<div class="form-group col-md-12">
    <label>GAC Token Settings</label>
    <div id="gac-settings">
        <p><strong>Admin Wallet:</strong> <span id="adminWallet">{{ $walletAddress }}</span></p>
        <p><strong>Token Price:</strong> <span id="tokenPrice">{{ $tokenFee }}</span> GAC</p>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js"></script>
<script type="text/javascript">
    window.onload = async function() {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                const contractABI = [ /* ABI of your contract */ ];
                const contractAddress = "{{ $contractAddress }}";

                const contract = new web3.eth.Contract(contractABI, contractAddress);
                
                // Fetch and display the GAC Admin Wallet and token price
                const adminWallet = await contract.methods.guhitPinasAdminWallet().call();
                const tokenPrice = await contract.methods.tokenPrice().call();

                document.getElementById('adminWallet').textContent = adminWallet;
                document.getElementById('tokenPrice').textContent = web3.utils.fromWei(tokenPrice, 'ether');
            } catch (error) {
                console.error("Error fetching contract data", error);
            }
        } else {
            console.error("MetaMask not detected");
        }
    };
</script>
