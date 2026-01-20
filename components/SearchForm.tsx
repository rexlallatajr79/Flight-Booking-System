
import React, { useState } from 'react';
import { DESTINATIONS, ICONS } from '../constants';
import { BookingData } from '../types';

interface SearchFormProps {
  onSearch: (data: Partial<BookingData>) => void;
  initialData: BookingData;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, initialData }) => {
  const [origin, setOrigin] = useState(initialData.origin);
  const [dest, setDest] = useState(initialData.destination);
  const [date, setDate] = useState(initialData.departureDate);
  const [pax, setPax] = useState(initialData.passengers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dest) return alert('Please select a destination');
    onSearch({ origin, destination: dest, departureDate: date, passengers: pax });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="bg-blue-600 text-white p-6 -mx-4 -mt-4 mb-6 rounded-b-3xl shadow-lg border-b-4 border-blue-700">
        <h2 className="text-2xl font-black mb-1 italic">Where to next?</h2>
        <p className="text-blue-100 text-sm font-medium">Fly to your dream destination with us.</p>
      </div>

      <div className="space-y-4 px-2">
        {/* Origin */}
        <div className="relative group">
          <label className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">From</label>
          <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-yellow-400 transition-colors py-2">
            <span className="text-blue-400 mr-3"><ICONS.Plane /></span>
            <select 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-transparent outline-none font-bold text-lg text-gray-800"
            >
              {DESTINATIONS.map(d => <option key={d.code} value={d.code}>{d.name} ({d.code})</option>)}
            </select>
          </div>
        </div>

        {/* Destination */}
        <div className="relative group">
          <label className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">To</label>
          <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-yellow-400 transition-colors py-2">
            <span className="text-blue-400 mr-3"><ICONS.Plane /></span>
            <select 
              value={dest} 
              onChange={(e) => setDest(e.target.value)}
              className="w-full bg-transparent outline-none font-bold text-lg text-gray-800"
            >
              <option value="" disabled>Select Destination</option>
              {DESTINATIONS.filter(d => d.code !== origin).map(d => <option key={d.code} value={d.code}>{d.name} ({d.code})</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <div className="relative group">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">Departure</label>
            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-yellow-400 transition-colors py-2">
              <span className="text-blue-400 mr-3"><ICONS.Calendar /></span>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent outline-none font-bold text-sm text-gray-800"
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="relative group">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">Passengers</label>
            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-yellow-400 transition-colors py-2">
              <span className="text-blue-400 mr-3"><ICONS.Users /></span>
              <input 
                type="number" 
                min="1" 
                max="9" 
                value={pax} 
                onChange={(e) => setPax(parseInt(e.target.value))}
                className="w-full bg-transparent outline-none font-bold text-lg text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 px-2">
        <button 
          type="submit" 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-black py-4 rounded-2xl shadow-[0_4px_0_0_#eab308] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 uppercase italic"
        >
          <ICONS.Search />
          Search Flights
        </button>
      </div>

      <div className="mt-8 px-2">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Trending Destinations</h3>
        <div className="grid grid-cols-2 gap-3">
          {['MPH', 'ICN', 'BKK', 'CEB'].map(code => {
            const dest = DESTINATIONS.find(d => d.code === code);
            return (
              <button 
                key={code} 
                type="button"
                onClick={() => setDest(code)}
                className="relative h-28 rounded-2xl overflow-hidden shadow-sm group border-2 border-white"
              >
                <img src={`https://picsum.photos/seed/${code}/200/150`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={dest?.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-left">
                  <p className="text-white text-xs font-black leading-none">{dest?.name}</p>
                  <p className="text-yellow-400 text-[10px] font-black uppercase mt-1">from ₱2,499</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
