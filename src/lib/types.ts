export interface PhotonFeature {
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  properties: {
    osm_id: number;
    name: string;
    country: string;
    state?: string;
    city?: string;
    postcode?: string;
    street?: string;
    housenumber?: string;
  };
  type: string;
}

export interface BudgetProps {
  id: number;
  title: string;
  desc: string;
  icon: string;
  type: string;
}

export interface TravelProps {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people: string;
}

export interface FormData {
  location?: string;
  totalDays?: number;
  budget?: "Cheap" | "Moderate" | "Luxury";
  traveler?: "solo" | "couple" | "family" | "friends";
}

export interface PlaceVisit {
  geoCoordinates: string;
  placeDetails: string;
  placeImageUrl: string;
  placeName: string;
  rating: string;
  ticketPricing: string;
  time: string;
}

export interface ItineraryDay {
  day: string;
  plan: PlaceVisit[];
}

interface UserSelection {
  budget: string;
  location: string;
  totalDays: string;
  traveler: string;
}

export interface TripData {
  id: string;
  tripData: Record<string, any>;
  hotelOptions: Array<Record<string, unknown>>;
  itinerary: ItineraryDay[];
  userEmail: string;
  userSelection: UserSelection;
}

export interface HotelOption {
  id: string;
  description: string;
  geoCoordinates: string;
  hotelAddress: string;
  hotelImageUrl: string;
  hotelName: string;
  price: string;
  rating: string;
}
