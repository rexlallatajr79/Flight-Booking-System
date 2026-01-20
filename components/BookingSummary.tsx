
import React from 'react';
import { BookingData } from '../types';

interface BookingSummaryProps {
  data: BookingData;
  onConfirm: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ data, onConfirm }) => {
  const flight = data.selectedFlight!;
  const total = flight.price * data.passengers;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="bg-blue-600 text-white p-6 -mx-4 -mt-4 mb-6 rounded-b-3xl shadow-lg border-b-4 border-blue-700">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Review Itinerary</h2>
        <p className="text-blue-100 text-sm font-medium">One last check before we take off!</p>
      </div>

      <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] p-6 shadow-sm relative mx-1">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-50 rounded-full border-r-2 border-gray-200" />
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-50 rounded-full border-l-2 border-gray-200" />
        
        <div className="flex justify-between items-center mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-black text-blue-600 text-[10px] italic border-2 border-yellow-500">CEB</div>
            <p className="font-black text-blue-600 italic tracking-widest">{flight.flightNumber}</p>
          </div>
          <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] italic">Economy Go</span>
        </div>

        <div className="flex justify-between items-center relative mb-10 px-2">
          <div className="text-left">
            <p className="text-4xl font-black text-blue-600 italic leading-none">{flight.origin}</p>
            <p className="text-[10px] font-black text-blue-300 mt-2 uppercase tracking-widest">{flight.departureTime}</p>
          </div>
          
          <div className="flex-1 px-4 flex flex-col items-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
             <div className="w-full h-1 bg-blue-50 mt-3 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full w-2/3 rounded-full"></div>
             </div>
          </div>

          <div className="text-right">
            <p className="text-4xl font-black text-blue-600 italic leading-none">{flight.destination}</p>
            <p className="text-[10px] font-black text-blue-300 mt-2 uppercase tracking-widest">{flight.arrivalTime}</p>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-gray-50 border-dashed space-y-4 px-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-300 font-black uppercase tracking-widest">Guests ({data.passengers})</span>
            <span className="text-gray-800 font-black">₱{(flight.price * data.passengers).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-300 font-black uppercase tracking-widest">Fees & Surcharge</span>
            <span className="text-green-500 font-black italic">Free</span>
          </div>
          <div className="flex justify-between items-end pt-4 border-t-2 border-blue-50">
             <span className="text-xl font-black text-blue-600 italic uppercase">Total Due</span>
             <span className="text-3xl font-black text-blue-600">₱{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-5 rounded-[2rem] flex gap-4 border-2 border-yellow-200/50 mx-1">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0078bf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div>
          <h4 className="text-blue-600 text-sm font-black uppercase italic">Safe & Secure Pay</h4>
          <p className="text-blue-400 text-xs font-medium">Your data is protected by industry standard encryption.</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/80 backdrop-blur-md border-t-2 border-blue-50 shadow-up z-50">
        <button 
          onClick={onConfirm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-[0_4px_0_0_#1e3a8a] active:shadow-none active:translate-y-[4px] transition-all uppercase italic tracking-wider text-lg"
        >
          Confirm & Pay ₱{total.toLocaleString()}
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
