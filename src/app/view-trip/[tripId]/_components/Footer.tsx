import { TripData } from "@/lib/types";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="mt-6">
      <h2 className="text-gray-400 text-center">
        Created by
        <Link
          href={"https://github.com/Creator-Art-Life"}
          className="font-bold"
        >
          {" "}
          Maxim
        </Link>
      </h2>
    </div>
  );
}

export default Footer;
