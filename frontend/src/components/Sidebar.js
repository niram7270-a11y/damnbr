import React from 'react';

const Sidebar = ({ leaderboard, friends }) => {
  return (
    <div className="space-y-6">
      {/* Leaderboard Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-yellow-500">🏆</div>
            <h3 className="text-white font-semibold">Leaderboard</h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 text-sm font-medium">Live</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {leaderboard.map((player) => (
            <div key={player.rank} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm w-4">{player.rank}.</span>
                <span className="text-white font-medium">{player.name}</span>
              </div>
              <span className="text-yellow-500 font-semibold">{player.earnings}</span>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 px-4 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm">
          View Full Leaderboard
        </button>
      </div>
      
      {/* Friends Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-blue-500">👥</div>
            <h3 className="text-white font-semibold">Friends</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
            <span className="text-gray-400 text-sm">{friends.online} playing</span>
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <p className="text-gray-400 text-sm mb-4">{friends.message}</p>
        </div>
        
        <button className="w-full py-2 px-4 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm">
          Add Friends
        </button>
      </div>
    </div>
  );
};

export default Sidebar;