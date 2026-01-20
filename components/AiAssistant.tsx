
import React, { useState, useEffect } from 'react';
import { getTravelSuggestions } from '../services/geminiService';
import { ICONS, DESTINATIONS } from '../constants';

interface AiAssistantProps {
  currentDestination: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ currentDestination }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    if (!currentDestination) return;
    setLoading(true);
    const dest = DESTINATIONS.find(d => d.code === currentDestination)?.name || currentDestination;
    const suggestions = await getTravelSuggestions(dest);
    setData(suggestions);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && currentDestination) {
      fetchAdvice();
    }
  }, [isOpen, currentDestination]);

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-[2rem] shadow-2xl border-4 border-yellow-400 p-6 animate-slideUp overflow-hidden z-[100]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow-md">
               <ICONS.Sparkles />
            </div>
            <div>
              <h4 className="text-md font-black text-blue-600 italic leading-none">CEB Travel AI</h4>
              <p className="text-[10px] text-blue-300 font-black uppercase tracking-widest mt-1">Your Virtual Expert</p>
            </div>
          </div>

          {!currentDestination ? (
            <div className="bg-blue-50 p-4 rounded-2xl text-center">
                <p className="text-xs text-blue-600 font-bold italic">Select a destination to get travel insights!</p>
            </div>
          ) : loading ? (
            <div className="space-y-4 px-2">
              <div className="h-4 w-full bg-blue-50 rounded-full animate-pulse" />
              <div className="h-4 w-3/4 bg-blue-50 rounded-full animate-pulse" />
              <div className="h-4 w-1/2 bg-blue-50 rounded-full animate-pulse" />
            </div>
          ) : data ? (
            <div className="space-y-6">
               <div className="px-2">
                 <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-3">Top Things To Do</p>
                 <ul className="space-y-3">
                   {data.suggestions.map((s: string, i: number) => (
                     <li key={i} className="text-xs text-gray-700 flex gap-3 items-start font-semibold">
                       <span className="text-yellow-400 font-black text-lg leading-none mt-0.5">★</span>
                       {s}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="bg-yellow-400/10 p-4 rounded-2xl border-2 border-yellow-400/30 shadow-inner">
                 <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-2">Expert Travel Tip</p>
                 <p className="text-xs text-blue-900 leading-relaxed italic font-bold">"{data.tip}"</p>
               </div>
            </div>
          ) : (
            <p className="text-xs text-red-500 font-bold px-2">Offline. Please try again later.</p>
          )}

          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-blue-100 hover:text-blue-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full shadow-xl flex items-center justify-center text-white ring-4 ring-white active:scale-90 transition-transform z-[101]"
      >
        <div className="relative">
            <ICONS.Sparkles />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-blue-600 animate-ping"></div>
        </div>
      </button>
    </div>
  );
};

export default AiAssistant;
