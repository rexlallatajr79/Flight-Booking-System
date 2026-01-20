
import React, { useState } from 'react';
import { Passenger } from '../types';

interface PassengerFormProps {
  count: number;
  onSubmit: (details: Passenger[]) => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({ count, onSubmit }) => {
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array(count).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      gender: 'male',
      dateOfBirth: '',
      nationality: 'PH'
    }))
  );

  const updatePassenger = (index: number, fields: Partial<Passenger>) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], ...fields };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passengers.some(p => !p.firstName || !p.lastName || !p.dateOfBirth)) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(passengers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="bg-blue-600 text-white p-6 -mx-4 -mt-4 mb-6 rounded-b-3xl shadow-lg border-b-4 border-blue-700">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Guest Details</h2>
        <p className="text-blue-100 text-sm font-medium">Please enter your travel document info.</p>
      </div>

      <div className="px-1 space-y-6">
        {passengers.map((p, i) => (
          <div key={i} className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b-2 border-dashed pb-3 mb-2">
              <h3 className="font-black text-blue-600 italic uppercase">Passenger {i + 1}</h3>
              <span className="text-[10px] bg-yellow-400 text-blue-600 px-3 py-1 rounded-full font-black uppercase italic shadow-sm">Adult</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-1">First Name</label>
                <input 
                  type="text" 
                  required
                  value={p.firstName} 
                  onChange={e => updatePassenger(i, { firstName: e.target.value })}
                  className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-yellow-400 font-bold text-gray-800 transition-colors"
                  placeholder="JUAN"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={p.lastName} 
                  onChange={e => updatePassenger(i, { lastName: e.target.value })}
                  className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-yellow-400 font-bold text-gray-800 transition-colors"
                  placeholder="DELA CRUZ"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-1">Gender</label>
                <select 
                  value={p.gender} 
                  onChange={e => updatePassenger(i, { gender: e.target.value as any })}
                  className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-yellow-400 font-bold text-gray-800"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-1">Birth Date</label>
                <input 
                  type="date" 
                  required
                  value={p.dateOfBirth} 
                  onChange={e => updatePassenger(i, { dateOfBirth: e.target.value })}
                  className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-yellow-400 font-bold text-gray-800"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-2 pt-2">
        <button 
          type="submit" 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-black py-4 rounded-2xl shadow-[0_4px_0_0_#eab308] active:shadow-none active:translate-y-[4px] transition-all uppercase italic"
        >
          Confirm Details
        </button>
      </div>
    </form>
  );
};

export default PassengerForm;
