import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 md:mx-8 lg:mx-20 xl:mx-56 gap-4 md:gap-6 lg:gap-9 mt-12 max-md:mt-6 max-md:justify-center min-h-[90vh]">
      <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-center leading-tight">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>
        <br className="hidden sm:block" />
        <span className="block mt-2 sm:mt-0">
          Personalized Itineraries at Your Fingertips
        </span>
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-500 text-center max-w-3xl px-4">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link href={"create-trip"}>
        <Button className="text-sm md:text-base px-6 py-4">
          Get Started. It&apos;s Free
        </Button>
      </Link>

      <div className="w-[81vh] max-md:w-full max-md:max-h-[70vh] max-md:landscape:max-h-[80vh]overflow-hidden transition-all duration-300 ease-in-out">
        <img
          src={"/demo.png"}
          srcSet="/demo.png 1x, /demo@2x.png 2x"
          className="w-full h-full object-contain max-md:object-scale-downhover:scale-105 transition-transform duration-300"
          alt="Travel plan preview"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Hero;
