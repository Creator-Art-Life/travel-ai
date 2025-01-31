import { TripData } from "@/lib/types";
import { usePhotoTrip } from "@/service/photoTrip";
import React, { useEffect, useState } from "react";

function InfoSection({ trip }: { trip: TripData }) {
  const { photoUrl } = usePhotoTrip(trip.userSelection.location);

  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/public/road-trip-vacation.jpg"}
        className="h-[330px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-6 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip.userSelection.location}</h2>
          <div className="flex gap-6 mt-4 ">
            <h2 className="bg-gray-200 font-medium text-gray-600 rounded-full max-sm:rounded-2xl p-1 px-4 md:text-md max-sm:flex items-center">
              <p className="max-sm:hidden">🗓️</p>{" "}
              {trip?.userSelection?.totalDays} Day
            </h2>
            <h2 className="bg-gray-200 font-medium text-gray-600 rounded-full max-sm:rounded-2xl p-1 px-4 md:text-md">
              <p className="max-sm:hidden">👩‍👧‍👦</p>
              Number of Traveler : {trip?.userSelection?.traveler} People
            </h2>
            <h2 className="bg-gray-200 font-medium text-gray-600 rounded-full max-sm:rounded-2xl p-1 px-4 md:text-md">
              💵 {trip?.userSelection?.budget} Budget{" "}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
