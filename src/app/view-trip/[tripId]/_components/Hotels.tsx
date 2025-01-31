import { TripData, HotelOption } from "@/lib/types";
import { usePhotoTrip } from "@/service/photoTrip";
import Link from "next/link";
import React from "react";

interface HotelsProps {
  trip: TripData;
}

function Hotels({ trip }: HotelsProps) {
  return (
    <div>
      <h2 className="font-bold text-xl my-7">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(trip.tripData?.hotelOptions) &&
          trip.tripData.hotelOptions.map((item: HotelOption, index: number) => (
            <HotelCardItem item={item} key={index} />
          ))}
      </div>
    </div>
  );
}

function HotelCardItem({ item }: { item: HotelOption }) {
  //@ts-expect-error some text error
  const { photoUrl } = usePhotoTrip();
  function removePerNight(priceString: string): string {
    return priceString.replace(/ per night/gi, "");
  }
  const cleanedPrice = removePerNight(item?.price);
  return (
    <div>
      <Link
        href={
          "https://www.google.com/maps/search/?api=1&query=" +
          item?.hotelName +
          "," +
          item?.hotelAddress
        }
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img
            src={photoUrl ? photoUrl : "/public/road-trip-vacation.jpg"}
            className="rounded-xl h-[180px] w-full object-cover"
          />
          <div className="my-3 py-2">
            <h2 className="font-medium">{item?.hotelName}</h2>
            <h2 className="text-xs text-gray-500 mt-2">
              📍{item?.hotelAddress}{" "}
            </h2>
            <h2 className="text-sm mt-2">💰{cleanedPrice}</h2>
            <h2 className="text-sm mt-2">⭐{item?.rating} </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Hotels;
