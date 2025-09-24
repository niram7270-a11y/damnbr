import React, { useState } from 'react';
import { useMultiWallet } from '../contexts/MultiWalletContext';

const WalletPanel = () => {
  const { 
    isConnected, 
    isConnecting,
    address, 
    balance, 
    chainId,
    refreshBalance, 
    connectWallet,
    disconnectWallet,
    getNetworkName 
  } = useMultiWallet();
  
  const [showAddFunds, setShowAddFunds] = useState(false);

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Adresse copiée dans le presse-papier !');
    }
  };

  // Fonction améliorée pour "Add Funds" qui détecte et connecte automatiquement le wallet
  const handleAddFunds = async () => {
    if (!isConnected) {
      try {
        // Vérifier si des wallets sont disponibles
        const hasMetaMask = typeof window.ethereum !== 'undefined';
        const hasCoinbase = typeof window.coinbaseWalletExtension !== 'undefined';
        
        if (!hasMetaMask && !hasCoinbase) {
          alert('Aucun wallet crypto détecté. Veuillez installer MetaMask, Coinbase Wallet ou un autre wallet compatible.');
          return;
        }

        // Connexion automatique au wallet détecté
        await connectWallet();
        
        // Si la connexion réussit, ouvrir directement le modal Add Funds
        setTimeout(() => {
          if (isConnected) {
            setShowAddFunds(true);
          }
        }, 500);
        
      } catch (error) {
        console.error('Erreur lors de la connexion automatique:', error);
        
        // Messages d'erreur plus spécifiques
        if (error.message?.includes('User rejected') || error.message?.includes('User denied')) {
          alert('Connexion refusée. Veuillez accepter la connexion dans votre wallet pour continuer.');
        } else if (error.message?.includes('No provider')) {
          alert('Wallet non détecté. Assurez-vous qu\'un wallet crypto est installé et débloqué.');
        } else {
          alert('Impossible de se connecter au wallet. Vérifiez que votre wallet est débloqué et réessayez.');
        }
      }
    } else {
      // Si déjà connecté, ouvrir directement le modal
      setShowAddFunds(true);
    }
  };

  const handleCashOut = () => {
    if (!isConnected) {
      alert('Veuillez connecter votre wallet pour effectuer un retrait.');
      return;
    }
    if (parseFloat(balance) <= 0) {
      alert('Solde insuffisant pour effectuer un retrait');
      return;
    }
    alert('Fonctionnalité de retrait (demo uniquement)');
  };

  const confirmAddFunds = (amount) => {
    alert(`Ajout de $${amount} - Fonctionnalité de démonstration`);
    setShowAddFunds(false);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Section */}
      <div className="bg-gray-800/60 border border-gray-700/80 rounded-xl p-4 backdrop-blur-md shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-green-500">💰</div>
            <h3 className="text-white font-semibold">Wallet</h3>
            {isConnected && chainId && (
              <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded-full">
                {getNetworkName(chainId)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isConnected && (
              <>
                <button 
                  onClick={copyAddress}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Copy Address
                </button>
                <button 
                  onClick={refreshBalance}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
                <button 
                  onClick={disconnectWallet}
                  className="text-red-400 hover:text-red-300 transition-colors"
                  title="Disconnect Wallet"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Balance Display */}
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-white mb-1">$0.00</div>
            <div className="text-gray-400 text-sm">
              {isConnected ? `${balance} ETH` : '0.0000 SOL'}
            </div>
          </div>

          {/* Wallet Address - only show when connected */}
          {isConnected && (
            <div className="bg-gray-700/40 rounded-lg p-3 mb-4">
              <div className="text-gray-400 text-xs mb-1">Wallet Address:</div>
              <div className="text-white text-sm font-mono">{formatAddress(address)}</div>
            </div>
          )}

          {/* Connection Status */}
          {isConnecting && (
            <div className="text-center py-2">
              <div className="text-yellow-500 text-sm flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                <span>Connexion en cours...</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleAddFunds}
              disabled={isConnecting}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Connexion...</span>
                </>
              ) : !isConnected ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Connect & Add</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>Add Funds</span>
                </>
              )}
            </button>
            <button 
              onClick={handleCashOut}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
            >
              Cash Out
            </button>
          </div>

          {/* Multi-Wallet Info */}
          {!isConnected && (
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Supporte MetaMask, WalletConnect, Coinbase Wallet et plus
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customize Section */}
      <div className="bg-gray-800/60 border border-gray-700/80 rounded-xl p-4 backdrop-blur-md shadow-2xl">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 text-purple-500">🎨</div>
          <h3 className="text-white font-semibold">Customize</h3>
        </div>
        
        <button className="w-full py-2 px-4 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm">
          Change Appearance
        </button>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800/95 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Add Funds</h3>
              <button 
                onClick={() => setShowAddFunds(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Sélectionnez un montant à ajouter à votre wallet :
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                {[10, 50, 100].map(amount => (
                  <button 
                    key={amount}
                    onClick={() => confirmAddFunds(amount)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowAddFunds(false)}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPanel;