import { ItineraryDay, PlaceVisit, TripData } from "@/lib/types";
import { usePhotoTrip } from "@/service/photoTrip";
import Link from "next/link";
import React from "react";

interface TripPlaceProps {
  trip: TripData;
}

function TripPlace({ trip }: TripPlaceProps) {
  if (!trip || !trip.tripData || !trip.tripData.itinerary) {
    return <div>No itinerary data available.</div>; // Or a loading indicator
  }
  const itineraryArray = Object.entries(trip.tripData.itinerary || {}).map(
    ([dayKey, places]) => ({
      day: parseInt(dayKey.replace("day", "")),
      places: Array.isArray(places) ? places : [],
    })
  );

  return (
    <div className="my-4">
      <h2 className="font-bold text-xl">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item: any, i: number) => (
          <div key={i}>
            <h2 className="font-medium text-l">Day {item?.day}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {item.plan?.map((place: any, i: number) => (
                <PlaceCardItem place={place} trip={trip} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceCardItem({ place, trip }: { place: PlaceVisit; trip: TripData }) {
  const { photoUrl } = usePhotoTrip(trip.userSelection.location);
  console.log("place", place);

  return (
    <div>
      <Link
        href={
          "https://www.google.com/maps/search/?api=1&query=" +
          place?.placeName +
          "," +
          place?.geoCoordinates
        }
        target="_blank"
      >
        <div className="my-4 bg-gray-50 p-2 gap-2 border rounded-lg flex flex-cols-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer ">
          <div className="py-2 mx-3">
            <img
              src={photoUrl ? photoUrl : "/public/road-trip-vacation.jpg"}
              className="w-[140px] h-[140px] rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-bold">{place.placeName}</h2>
            <p className="text-sm text-gray-500">{place.placeDetails}</p>
            <h2 className="font-medium text-sm">{place.ticketPricing}</h2>
            <h2 className="text-sm text-yellow-500">⭐{place.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TripPlace;
