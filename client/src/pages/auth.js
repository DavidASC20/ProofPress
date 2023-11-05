import React, { useState, useEffect } from 'react';
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
    }
  }, []);

  const connectToMetaMask = async () => {
    if (isMetaMaskInstalled) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error('MetaMask connection error:', error);
      }
    } else {
      console.error('MetaMask not found in your browser.');
    }
  }

  const disconnectFromMetaMask = () => {
    // Clear user-related data or tokens
    setUserAddress('');
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
