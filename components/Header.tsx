
import React from 'react';

interface HeaderProps {
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <header className="bg-yellow-400 p-4 sticky top-0 z-40 flex items-center shadow-md border-b-2 border-yellow-500/20">
      {onBack && (
        <button onClick={onBack} className="mr-4 p-2 rounded-full bg-white/30 active:bg-white/50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0078bf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-blue-600 font-black text-2xl tracking-tighter leading-none italic">MyCEBFlightsv3</h1>
        <span className="text-[8px] text-blue-600/70 font-bold uppercase tracking-[0.2em]">Every Juan Can Fly</span>
      </div>
      <div className="w-10 h-10 border-2 border-blue-600 rounded-full flex items-center justify-center bg-white shadow-inner overflow-hidden">
        <img src="https://picsum.photos/seed/user/40/40" alt="profile" />
      </div>
    </header>
  );
};

export default Header;
