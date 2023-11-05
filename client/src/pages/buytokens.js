import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const BuyTokensPage = ({ contractAddress, contractABI }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenAmount, setTokenAmount] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setContract(new web3Instance.eth.Contract(contractABI, contractAddress));

      // Get the user's address from MetaMask
      web3Instance.eth.getAccounts()
        .then(accounts => {
          if (accounts.length > 0) {
            setUserAddress(accounts[0]);
          }
        })
        .catch(error => {
          console.error("Error fetching accounts", error);
        });
    } else {
      alert('Please install MetaMask to use this feature!');
    }
  }, [contractABI, contractAddress]);

  // Handle the change in token amount input
  const handleTokenAmountChange = (event) => {
    setTokenAmount(event.target.value);
  };

  // Function to call the contract's buy function
  const buyTokens = async () => {
    if (!userAddress || !web3) {
      alert('Please connect to MetaMask.');
      return;
    }

    const value = web3.utils.toWei(tokenAmount, 'ether');
    try {
      await contract.methods.buyTokens().send({
        from: userAddress,
        value: value,
        // Set the appropriate gas limit
      });
      alert('Tokens purchased successfully!');
    } catch (error) {
      console.error('Error buying tokens:', error);
      alert('There was an error purchasing tokens.');
    }
  };

  return (
    <div>
      <h2>Buy Tokens</h2>
      <input
        type="number"
        value={tokenAmount}
        onChange={handleTokenAmountChange}
        placeholder="Amount of ETH to use for buying tokens"
      />
      <button onClick={buyTokens} disabled={!userAddress}>Buy Tokens</button>
      {userAddress ? (
        <p>Connected Ethereum Address: {userAddress}</p>
      ) : (
        <p>Please connect to MetaMask.</p>
      )}
    </div>
  );
};

export default BuyTokensPage;
