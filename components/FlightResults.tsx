
import React, { useMemo, useEffect, useState } from 'react';
import { Flight } from '../types';
import { DESTINATIONS } from '../constants';
import { getFlightPriceAlertReasoning } from '../services/geminiService';

interface FlightResultsProps {
  origin: string;
  destination: string;
  onSelect: (flight: Flight) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ origin, destination, onSelect }) => {
  const [insight, setInsight] = useState<string>("");

  useEffect(() => {
    const fetchInsight = async () => {
      const msg = await getFlightPriceAlertReasoning(origin, destination, "upcoming weeks");
      setInsight(msg);
    }
    fetchInsight();
  }, [origin, destination]);

  const mockFlights: Flight[] = useMemo(() => {
    const flights: Flight[] = [];
    const times = [
      { dep: '05:30', arr: '07:00' },
      { dep: '10:15', arr: '11:45' },
      { dep: '14:00', arr: '15:30' },
      { dep: '19:45', arr: '21:15' }
    ];

    times.forEach((t, i) => {
      flights.push({
        id: `FL-${i}`,
        origin,
        destination,
        departureTime: t.dep,
        arrivalTime: t.arr,
        duration: '1h 30m',
        price: 2499 + (i * 500) + Math.floor(Math.random() * 200),
        airline: 'MyCEBFlightsv3',
        flightNumber: `CEB ${100 + i}`
      });
    });
    return flights;
  }, [origin, destination]);

  const originName = DESTINATIONS.find(d => d.code === origin)?.name;
  const destName = DESTINATIONS.find(d => d.code === destination)?.name;

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white p-4 -mx-4 border-b-2 border-blue-50">
        <div className="flex items-center justify-between text-blue-600 font-black">
          <div>
            <span className="text-xl italic">{origin}</span>
            <span className="mx-2 text-yellow-400">→</span>
            <span className="text-xl italic">{destination}</span>
          </div>
          <div className="text-[10px] font-bold bg-blue-50 px-2 py-1 rounded-full uppercase">
            {mockFlights.length} Flights
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1 font-medium">{originName} to {destName}</div>
      </div>

      {insight && (
        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-3 flex gap-3 items-start shadow-sm">
          <div className="text-blue-600 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <p className="text-[11px] leading-tight text-blue-800 font-semibold">
            <span className="font-black uppercase text-blue-600 mr-1">AI Tip:</span> {insight}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {mockFlights.map(flight => (
          <button 
            key={flight.id} 
            onClick={() => onSelect(flight)}
            className="w-full bg-white border-2 border-gray-100 rounded-3xl p-5 text-left shadow-sm hover:border-yellow-400 transition-all active:scale-[0.98]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-black text-blue-600 text-[10px] italic shadow-sm border border-yellow-500">CEB</div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{flight.flightNumber}</p>
                  <p className="text-xs font-black text-blue-600 italic">GoBasic</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-black uppercase">Fly for</p>
                <p className="text-xl font-black text-blue-600">₱{flight.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xl font-black text-gray-800 leading-none">{flight.departureTime}</p>
                <p className="text-xs font-black text-blue-400 mt-1 uppercase tracking-tighter">{flight.origin}</p>
              </div>
              <div className="flex-1 flex flex-col items-center px-4">
                <p className="text-[10px] text-gray-400 font-black mb-1 italic">{flight.duration}</p>
                <div className="w-full h-1 bg-yellow-100 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-400 w-1/2 rounded-full"></div>
                </div>
                <p className="text-[10px] text-blue-400 font-black mt-1 uppercase italic">Non-stop</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-xl font-black text-gray-800 leading-none">{flight.arrivalTime}</p>
                <p className="text-xs font-black text-blue-400 mt-1 uppercase tracking-tighter">{flight.destination}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
