"use client";

import { toast } from "@/hooks/use-toast";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfoSection from "./_components/InfoSection";
import Hotels from "./_components/Hotels";
import TripPlace from "./_components/TripPlace";
import Footer from "./_components/Footer";
import { TripSkeleton } from "@/components/SkeletonTrip/SkeletonTrip";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();
  const GetTripData = async () => {
    //@ts-expect-error some text type
    const docRef = doc(db, "Ai-travel", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //@ts-expect-error some text type
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
      toast({ title: "No trip found!" });
    }
  };

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  console.log("trip", trip);

  return (
    <div className="p-12 md:px-25 lg:px-44 xl:px:56">
      {trip ? (
        <>
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <TripPlace trip={trip} />
          <Footer />
        </>
      ) : (
        <TripSkeleton />
      )}
    </div>
  );
}

export default ViewTrip;
