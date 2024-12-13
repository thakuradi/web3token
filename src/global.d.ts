// src/global.d.ts
export {};

declare global {
  interface Window {
    ethereum?: any; // MetaMask injects the `ethereum` object
  }
}
