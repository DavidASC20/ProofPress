import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
    </div>
  );
};

const Login = () => {
  const [userAddress, setUserAddress] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
      const address = localStorage.getItem('userAddress');
      if (address) {
        setUserAddress(address);
      }
    }
  }, []);

  const connectToMetaMask = async (event) => {
    event.preventDefault();
    if (isMetaMaskInstalled) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);
        localStorage.setItem('userAddress', accounts[0]); // Save to localStorage

        // send address to database in the backend
        const response = await axios.post("http://localhost:3001/auth-users/login", {ethereum_address: accounts[0]});
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("metamask not found in browser");
    }
  }
  

  const disconnectFromMetaMask = () => {
    // Clear user-related data or tokens
    setUserAddress('');
    localStorage.removeItem('userAddress'); // Remove from localStorage
  }
  

  return (
    <div className="login">
      <h2>Login with MetaMask</h2>
      {isMetaMaskInstalled ? (
        <div>
          {userAddress ? (
            <div>
              <button onClick={disconnectFromMetaMask}>Disconnect</button>
              <p>Connected Ethereum Address: {userAddress}</p>
            </div>
          ) : (
            <button onClick={connectToMetaMask}>Connect to MetaMask</button>
          )}
        </div>
      ) : (
        <p>MetaMask is not installed in your browser.</p>
      )}
    </div>
  );
};
