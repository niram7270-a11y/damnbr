import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

const WalletPanel = () => {
  const { isConnected, address, balance, refreshBalance, connectWallet } = useWallet();
  const [showAddFunds, setShowAddFunds] = useState(false);

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  const handleAddFunds = () => {
    alert('Add funds functionality would redirect to payment processor (demo only)');
    setShowAddFunds(false);
  };

  const handleCashOut = () => {
    if (parseFloat(balance) <= 0) {
      alert('No funds available to cash out');
      return;
    }
    alert('Cash out functionality would process withdrawal (demo only)');
  };

  return (
    <div className="space-y-6">
      {/* Wallet Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-green-500">💰</div>
            <h3 className="text-white font-semibold">Wallet</h3>
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
              </>
            )}
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            {/* Balance Display */}
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-gray-400 text-sm">{balance} ETH</div>
            </div>

            {/* Wallet Address */}
            <div className="bg-gray-700/30 rounded-lg p-3">
              <div className="text-gray-400 text-xs mb-1">Wallet Address:</div>
              <div className="text-white text-sm font-mono">{formatAddress(address)}</div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowAddFunds(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Add Funds
              </button>
              <button 
                onClick={handleCashOut}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
              >
                Cash Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <p className="text-gray-400 text-sm mb-4">Connect your wallet to start playing</p>
            <button 
              onClick={connectWallet}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>

      {/* Customize Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
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
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
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
                This is a demo. In a real application, this would connect to a payment processor 
                to add funds to your gaming wallet.
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                {[10, 50, 100].map(amount => (
                  <button 
                    key={amount}
                    onClick={handleAddFunds}
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPanel;