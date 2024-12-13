import { ethers } from "ethers";

export const connectToMetaMask = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(accounts[0]);

  return { account: accounts[0], balance: ethers.utils.formatEther(balance) };
};
