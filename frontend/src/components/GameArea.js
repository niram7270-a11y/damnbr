import React, { useState } from 'react';
import { mockData } from '../data/mockData';

const GameArea = ({ selectedAmount, setSelectedAmount, gameStats }) => {
  const [playerName, setPlayerName] = useState('');
  
  const betAmounts = mockData.betAmounts;

  const handleJoinGame = () => {
    if (!playerName.trim()) {
      alert('Please enter your name to join the game!');
      return;
    }
    alert(`Joined game with $${selectedAmount} bet! (This is a demo)`);
  };

  return (
    <div className="text-center space-y-8">
      {/* Main Logo */}
      <div className="mb-12">
        <h1 className="text-6xl md:text-7xl font-black text-white mb-2 tracking-wider">
          DAMN<span className="text-yellow-500">BRUH</span>
        </h1>
        <p className="text-gray-300 text-lg font-medium tracking-widest">
          SKILL-BASED BETTING
        </p>
      </div>

      {/* Name Input and Help */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center cursor-help group relative">
          <span className="text-black font-bold">?</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Enter your name to play
          </div>
        </div>
        <input
          type="text"
          placeholder="Login to set your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
        />
        <button className="p-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </button>
      </div>

      {/* Bet Amount Selection */}
      <div className="flex justify-center space-x-4 mb-8">
        {betAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
              selectedAmount === amount
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/25'
                : 'bg-gray-800/50 border border-gray-600 text-white hover:bg-yellow-500/20 hover:border-yellow-500/50'
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>

      {/* Join Game Button */}
      <button
        onClick={handleJoinGame}
        className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold text-xl px-12 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105 flex items-center space-x-3 mx-auto"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <span>JOIN GAME</span>
      </button>

      {/* Game Mode Selection */}
      <div className="flex justify-center space-x-4 mb-8">
        <button className="bg-gray-800/50 border border-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300 flex items-center space-x-2">
          <span className="text-sm">🇺🇸</span>
          <span>US</span>
        </button>
        <button className="bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-6 py-2 rounded-lg transition-all duration-300">
          Browse Lobbies
        </button>
      </div>

      {/* Game Statistics */}
      <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-500 mb-1">
            {gameStats.playersInGame}
          </div>
          <div className="text-gray-400 text-sm">Players In Game</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-500 mb-1">
            {gameStats.globalWinnings}
          </div>
          <div className="text-gray-400 text-sm">Global Player Winnings</div>
        </div>
      </div>

      {/* Manage Affiliate Button */}
      <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>Manage Affiliate</span>
      </button>
    </div>
  );
};

export default GameArea;