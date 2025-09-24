import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import GameArea from './GameArea';
import WalletPanel from './WalletPanel';
import { mockData } from '../data/mockData';

const HomePage = () => {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [gameStats, setGameStats] = useState(mockData.gameStats);
  const [leaderboard, setLeaderboard] = useState(mockData.leaderboard);
  const [friends, setFriends] = useState(mockData.friends);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            minWidth: '100%', 
            minHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
        >
          <source src="/snake-background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay sombre optimisé pour la vidéo Snake hexagonal */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar leaderboard={leaderboard} friends={friends} />
          </div>
          
          {/* Main Game Area */}
          <div className="lg:col-span-6">
            <GameArea 
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
              gameStats={gameStats}
            />
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <WalletPanel />
          </div>
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="fixed bottom-6 left-6 z-20">
        <button className="bg-discord-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
          </svg>
          <span>Join Discord!</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;