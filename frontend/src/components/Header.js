import React from 'react';
import { useWallet } from '../contexts/WalletContext';

const Header = () => {
  const { isConnected, connectWallet, isConnecting } = useWallet();

  return (
    <header className="relative z-20 flex justify-between items-center px-6 py-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-sm">🎮</span>
        </div>
        <span className="text-white font-medium">Welcome, bruh!</span>
      </div>
      
      <button 
        onClick={connectWallet}
        disabled={isConnecting}
        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
          isConnected 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-yellow-500 hover:bg-yellow-600 text-black'
        } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Login'}
      </button>
    </header>
  );
};

export default Header;