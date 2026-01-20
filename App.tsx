
import React, { useState, useEffect } from 'react';
import { BookingStep, BookingData, Flight, Passenger } from './types';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
import PassengerForm from './components/PassengerForm';
import BookingSummary from './components/BookingSummary';
import SuccessScreen from './components/SuccessScreen';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [step, setStep] = useState<BookingStep>(BookingStep.SEARCH);
  const [bookingData, setBookingData] = useState<BookingData>({
    origin: 'MNL',
    destination: '',
    departureDate: new Date().toISOString().split('T')[0],
    passengers: 1,
    passengerDetails: []
  });

  const handleSearch = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
    setStep(BookingStep.FLIGHT_SELECTION);
  };

  const handleFlightSelect = (flight: Flight) => {
    setBookingData(prev => ({ ...prev, selectedFlight: flight }));
    setStep(BookingStep.PASSENGER_DETAILS);
  };

  const handlePassengerSubmit = (details: Passenger[]) => {
    setBookingData(prev => ({ ...prev, passengerDetails: details }));
    setStep(BookingStep.SUMMARY);
  };

  const handlePayment = () => {
    setStep(BookingStep.SUCCESS);
  };

  const resetBooking = () => {
    setStep(BookingStep.SEARCH);
    setBookingData({
      origin: 'MNL',
      destination: '',
      departureDate: new Date().toISOString().split('T')[0],
      passengers: 1,
      passengerDetails: []
    });
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      <Header onBack={step !== BookingStep.SEARCH && step !== BookingStep.SUCCESS ? () => setStep(prev => {
          if (prev === BookingStep.FLIGHT_SELECTION) return BookingStep.SEARCH;
          if (prev === BookingStep.PASSENGER_DETAILS) return BookingStep.FLIGHT_SELECTION;
          if (prev === BookingStep.SUMMARY) return BookingStep.PASSENGER_DETAILS;
          return BookingStep.SEARCH;
      }) : undefined} />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-24">
        {step === BookingStep.SEARCH && (
          <SearchForm onSearch={handleSearch} initialData={bookingData} />
        )}
        
        {step === BookingStep.FLIGHT_SELECTION && (
          <FlightResults 
            origin={bookingData.origin} 
            destination={bookingData.destination} 
            onSelect={handleFlightSelect} 
          />
        )}

        {step === BookingStep.PASSENGER_DETAILS && (
          <PassengerForm 
            count={bookingData.passengers} 
            onSubmit={handlePassengerSubmit} 
          />
        )}

        {step === BookingStep.SUMMARY && (
          <BookingSummary 
            data={bookingData} 
            onConfirm={handlePayment} 
          />
        )}

        {step === BookingStep.SUCCESS && (
          <SuccessScreen onReset={resetBooking} />
        )}
      </main>

      {/* Persistent AI Helper at the bottom */}
      {step !== BookingStep.SUCCESS && (
        <div className="absolute bottom-4 right-4 z-50">
          <AiAssistant currentDestination={bookingData.destination} />
        </div>
      )}
    </div>
  );
};

export default App;
