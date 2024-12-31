"use client";
import React from "react";
import Image from "next/image";

function Compass({ windDir, windSpeed, date }) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 border rounded-lg dark:bg-dark-gray shadow-sm">
      <div className="relative">
        <Image src="/compass_body.svg" alt="compass" width={120} height={120} />
        <Image
          src="/compass_arrow.svg"
          alt="compass arrow"
          className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
          style={{
            transform: `rotate(${windDir}deg) translateX(-50%)`,
            height: "100%",
          }}
          width={12}
          height={12}
        />
      </div>
      <p className="mt-2 text-sm font-medium dark:text-white">
        {windSpeed} km/h
      </p>
      <p className="text-xs dark:text-gray-300">{date}</p>
    </div>
  );
}

export default Compass;
