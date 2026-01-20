
export enum BookingStep {
  SEARCH = 'SEARCH',
  FLIGHT_SELECTION = 'FLIGHT_SELECTION',
  PASSENGER_DETAILS = 'PASSENGER_DETAILS',
  SUMMARY = 'SUMMARY',
  SUCCESS = 'SUCCESS'
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  airline: string;
  flightNumber: string;
}

export interface BookingData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  selectedFlight?: Flight;
  passengerDetails: Passenger[];
}

export interface Passenger {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  nationality: string;
}
