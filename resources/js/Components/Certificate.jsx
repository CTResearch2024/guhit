import React from 'react';

const Certificate = ({ nft }) => {
    return (
        <div className="certificate">
                <div className="certificate">
        <img src="/img/COA.png" alt="Certificate Background" className="cert-bg" />
        <div className="cert-details">
            {/* <h1>"{nft.name}"</h1> */}
            <p>by {nft.artist_name}</p>
            <p>Medium: {nft.medium}</p>
            <p>Size: {nft.size}</p>
            <p>Date of Completion: {nft.completion_date}</p>
            <div className="qr-code">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${nft.nft_url}&size=100x100`} alt="QR Code" />
            </div>
        </div>
    </div>


            <style jsx>{`
.certificate {
    position: relative;
    width: 70%; /* Adjust width depending on your container */
    height: auto;
}

.cert-bg {
    width: 70%;
    height: auto;
    object-fit: cover;
}

.cert-details {
    position: absolute;
    top: 160px; /* Adjust these values */
    left: 100px; /* Adjust these values */
    width: 50%; /* You can control how wide the details box is */
    color: #b22d28; /* The text color */
    font-family: 'Georgia', serif;
}

.cert-details h1 {
    font-size: 20px; /* Adjust font size */
    margin: 0;
    font-weight: bold;
}

.cert-details p {
    font-size: 10px; /* Adjust font size */
    margin: 5px 0;
}

.qr-code {
    position: absolute;
    top: 10px; /* Adjust depending on where you want the QR code */
    right: 75px; /* Adjust depending on where you want the QR code */
    width: 70px;
    height: 90px;
}

            `}</style>
        </div>
    );
};

export default Certificate;
