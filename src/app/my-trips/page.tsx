"use client";

import { db } from "@/service/firebaseConfig";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { TripData } from "@/lib/types";
import { usePhotoTrip } from "@/service/photoTrip";
import Link from "next/link";

function MyTrips() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState<TripData[]>([]); // Указываем явный тип

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      router.push("/");
      return;
    }

    const q = query(
      collection(db, "Ai-travel"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    const trips: TripData[] = [];

    querySnapshot.forEach((doc) => {
      trips.push(doc.data() as TripData); // Явное приведение типа
    });

    setUserTrips(trips);
  };

  console.log("userTrips", userTrips);

  return (
    <div className='px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72"'>
      <h2 className="font-bold text-3xl mb-10">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-3">
        {userTrips.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCard key={index} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

function UserTripCard({ trip }: { trip: TripData }) {
  const { photoUrl } = usePhotoTrip(trip.userSelection.location);

  return (
    <Link
      href={"/view-trip/" + trip?.id}
      className="hover:scale-105 transition-all hover:shadow-sm rounded-xl pb-2"
    >
      <div className="h-[200px] rounded-lg overflow-hidden relative">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={trip.userSelection.location}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
          />
        ) : (
          <div className="h-[200px] w-full bg-slate-100 rounded-lg flex flex-col items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-slate-500 font-medium">
              Изображение не найдено
            </span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <h2 className="font-medium text-lg">{trip?.userSelection?.location}</h2>
        <h2 className="text-sm text-gray-600">
          {trip.userSelection.totalDays} Days trip with
          <span className="font-bold text-black">
            {" "}
            {trip.userSelection.budget}{" "}
          </span>{" "}
          Budget
        </h2>
      </div>
    </Link>
  );
}

export default MyTrips;
