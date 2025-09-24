import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

const MultiWalletContext = createContext();

export const useMultiWallet = () => {
  const context = useContext(MultiWalletContext);
  if (!context) {
    throw new Error('useMultiWallet must be used within a MultiWalletProvider');
  }
  return context;
};

export const MultiWalletProvider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0.0000');
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const initWeb3Modal = async () => {
      // Configuration des options de wallets
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0", // ID public Infura
            rpc: {
              1: "https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0",
              137: "https://polygon-rpc.com/",
              56: "https://bsc-dataseed.binance.org/",
            }
          }
        },
        coinbasewallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: "DamnBruh Gaming",
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0"
          }
        }
      };

      const modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
      });

      setWeb3Modal(modal);
    };

    initWeb3Modal();
  }, []);

  const connectWallet = async () => {
    if (!web3Modal) {
      alert('Initialisation en cours... Veuillez patienter quelques secondes.');
      return;
    }

    setIsConnecting(true);
    
    try {
      // Tentative de connexion automatique au wallet préféré
      const provider = await web3Modal.connect();
      setProvider(provider);

      // Initialiser Web3 avec ethers
      if (window.ethereum || provider) {
        const { ethers } = await import('ethers');
        const web3Provider = new ethers.providers.Web3Provider(provider);
        setWeb3(web3Provider);
        
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0];
          setAddress(address);
          setIsConnected(true);
          
          // Récupérer le solde
          try {
            const balance = await web3Provider.getBalance(address);
            const balanceInEth = ethers.utils.formatEther(balance);
            setBalance(parseFloat(balanceInEth).toFixed(4));
          } catch (balanceError) {
            console.warn('Could not fetch balance:', balanceError);
            setBalance('0.0000');
          }
          
          // Récupérer le chainId
          try {
            const network = await web3Provider.getNetwork();
            setChainId(network.chainId);
          } catch (networkError) {
            console.warn('Could not fetch network:', networkError);
          }

          // Succès de connexion
          console.log('✅ Wallet connecté avec succès:', address);
        }
      }

      // Écouter les changements de compte
      provider.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAddress(accounts[0]);
          refreshBalance();
        }
      });

      // Écouter les changements de réseau
      provider.on('chainChanged', (chainId) => {
        setChainId(parseInt(chainId, 16));
      });

      // Écouter les déconnexions
      provider.on('disconnect', () => {
        disconnectWallet();
      });

    } catch (error) {
      console.error('Failed to connect wallet:', error);
      
      // Messages d'erreur plus spécifiques et utiles
      if (error.message?.includes('User rejected') || error.message?.includes('User denied')) {
        throw new Error('User rejected');
      } else if (error.message?.includes('No Ethereum provider') || error.message?.includes('No provider')) {
        throw new Error('No provider');
      } else if (error.message?.includes('Modal closed by user')) {
        throw new Error('User rejected');
      } else {
        console.error('Erreur de connexion détaillée:', error);
        throw new Error('Connection failed');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    
    if (provider && provider.disconnect) {
      await provider.disconnect();
    }
    
    setProvider(null);
    setWeb3(null);
    setAddress('');
    setBalance('0.0000');
    setChainId(null);
    setIsConnected(false);
  };

  const refreshBalance = async () => {
    if (!web3 || !address) return;
    
    try {
      const { ethers } = await import('ethers');
      const balance = await web3.getBalance(address);
      const balanceInEth = ethers.utils.formatEther(balance);
      setBalance(parseFloat(balanceInEth).toFixed(4));
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  };

  const getNetworkName = (chainId) => {
    const networks = {
      1: 'Ethereum',
      56: 'BSC',
      137: 'Polygon',
      250: 'Fantom',
      43114: 'Avalanche',
    };
    return networks[chainId] || 'Unknown Network';
  };

  return (
    <MultiWalletContext.Provider value={{
      isConnected,
      isConnecting,
      address,
      balance,
      chainId,
      provider,
      web3,
      connectWallet,
      disconnectWallet,
      refreshBalance,
      getNetworkName,
      setBalance // Exposer setBalance pour permettre la mise à jour du solde
    }}>
      {children}
    </MultiWalletContext.Provider>
  );
};