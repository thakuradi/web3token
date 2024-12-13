import React, { useState } from "react";


import { ethers } from "ethers";

const MetaMaskIntegration: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  
  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask to use this feature.");
        return;
      }

      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      setAccount(account);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };


  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      alert("Please connect to MetaMask.");
      setAccount(null);
      setBalance(null);
    } else {
      setAccount(accounts[0]);
    }
  };

  
  const handleChainChanged = (chainId: string) => {
    console.log("Network changed to:", chainId);
    window.location.reload();
  };

  
  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">MetaMask Integration</h1>
      {account ? (
        <div>
          <p className="mb-2">Connected Account: <strong>{account}</strong></p>
          <p>Balance: <strong>{balance} ETH</strong></p>
        </div>
      ) : (
        <button
          onClick={connectMetaMask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default MetaMaskIntegration;
