
import React from 'react';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fadeIn py-12">
      <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      
      <div className="text-center">
        <h2 className="text-3xl font-black text-blue-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 max-w-[250px] mx-auto">Your flight tickets have been sent to your registered email address.</p>
      </div>

      <div className="w-full space-y-3">
         <button 
          className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          onClick={() => alert('Opening your E-Ticket...')}
        >
          VIEW E-TICKET
        </button>
        <button 
          onClick={onReset}
          className="w-full bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl transition-all active:scale-95"
        >
          BACK TO HOME
        </button>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-100 text-center">
         <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-2">Pro Tip</p>
         <p className="text-xs text-yellow-800 leading-relaxed">Check in online 24 hours before your flight to skip the counter queues!</p>
      </div>
    </div>
  );
};

export default SuccessScreen;
