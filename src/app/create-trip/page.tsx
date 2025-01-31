"use client";

import { PhotonFeature, TravelProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { OpenStreetMapAutocomplete } from "./_components/OpenStreetMapAutocomplete";
import { Input } from "@/components/ui/input";
import { FormData } from "@/lib/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  AI_PROMPT,
  BudgetOptions,
  TravelCompanions,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CreateTrip() {
  const [place, setPlace] = useState<PhotonFeature | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLocationSelect = (selectedItem: PhotonFeature | null) => {
    console.log("Selected location:", selectedItem);
    setPlace(selectedItem);
    handleInputChange("location", selectedItem?.properties?.name || "");
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const SaveAiTrip = async (TripData: any) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const docId = Date.now().toString();
    await setDoc(doc(db, "Ai-travel", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    router.push("/view-trip/" + docId);
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData!.totalDays! > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast({ title: "Please fill all details!" });
      return;
    }

    toast({ title: "Please wait... We are working on it..." });
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location || ""
    )
      .replace("{totalDays}", String(formData?.totalDays ?? ""))
      .replace("{traveler}", formData?.traveler || "")
      .replace("{budget}", formData?.budget || "");

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log("--",result?.response?.text());
    setLoading(false);
    console.log(result?.response?.text());
    SaveAiTrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo: any) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className=" max-w-6xl mx-auto sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-lg">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium" style={{ fontWeight: 500 }}>
            What is destination of choice?
          </h2>
          <OpenStreetMapAutocomplete onSelect={handleLocationSelect} />
        </div>

        {place && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium">Selected Location:</h3>
            <p>{place.properties.name}</p>
            <p>Coordinates: {place.geometry.coordinates.join(", ")}</p>
            <p>Country: {place.properties.country}</p>
          </div>
        )}
        <div className="mb-5">
          <label className="text-xl font-medium">
            How many days are you planning your trip?
          </label>
          <Input
            placeholder={"ex.3"}
            type="number"
            className="mt-2"
            min="1"
            onChange={(v) => handleInputChange("totalDays", v.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <p>
          The budget is exclusively allocated for activities and dining
          purposes.
        </p>
        <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
          {BudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${formData?.budget == item.title && "shadow-lg border-cyan-500"}
                `}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
        <label className="text-xl font-medium my-3">
          Who do you plan on traveling with on your next adventure?
        </label>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {TravelCompanions.map((item: TravelProps, index: number) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${
                  formData?.traveler == item.people &&
                  "shadow-lg border-cyan-500"
                }
                `}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 flex justify-end ">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/row-logo.svg" />
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button
                //@ts-expect-error typescript error
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
