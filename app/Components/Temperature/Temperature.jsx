"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  droplets,
  navigation,
  rain,
  snow,
  sun,
} from "@/app/utils/Icons";
import React, { useEffect } from "react";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

function Temperature() {
  const { forecast } = useGlobalContext();
  const { latitude, longitude, hourly, timezone } = forecast;
  const [localTime, setLocalTime] = React.useState("");
  const [currentDay, setCurrentDay] = React.useState("");

  if (!forecast) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const currWeatherCode = hourly?.weather_code?.[0];
  const currTemp = hourly?.temperature_2m?.[0];

  const hourlyTemperatures = hourly?.temperature_2m || [];

  const minTemp =
    hourlyTemperatures.length > 0 ? Math.min(...hourlyTemperatures) : undefined;
  const maxTemp =
    hourlyTemperatures.length > 0 ? Math.max(...hourlyTemperatures) : undefined;

  const getIcon = () => {
    if (currWeatherCode === 0) {
      return sun;
    } else if (currWeatherCode >= 1 && currWeatherCode <= 3) {
      return clearSky;
    } else if (currWeatherCode >= 51 && currWeatherCode <= 65) {
      return drizzleIcon;
    } else if (currWeatherCode >= 66 && currWeatherCode <= 77) {
      return snow;
    } else if (currWeatherCode >= 80 && currWeatherCode <= 82) {
      return droplets;
    } else if (currWeatherCode >= 95 && currWeatherCode <= 99) {
      return rain;
    } else {
      return clearSky;
    }
  };

  const displayIconMessage = () => {
    if (currWeatherCode === 0) {
      return "Sunny";
    } else if (currWeatherCode >= 1 && currWeatherCode <= 3) {
      return "Partly Cloudy";
    } else if (currWeatherCode >= 51 && currWeatherCode <= 65) {
      return "Light Rains";
    } else if (currWeatherCode >= 66 && currWeatherCode <= 77) {
      return "Snow";
    } else if (currWeatherCode >= 80 && currWeatherCode <= 82) {
      return "Raining";
    } else if (currWeatherCode >= 95 && currWeatherCode <= 99) {
      return "Thunderstorms";
    } else {
      return "Partly Cloudy";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);

      const formattedTime = localMoment.format("HH:mm:ss");

      const day = localMoment.format("dddd");
      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none ">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}(UTC)</span>
      </p>
      <p className="pt-2 flex gap-1 font-bold">
        <span>
          {latitude} : {longitude}
        </span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-8xl font-bold self-center">{currTemp}°C</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">
            {displayIconMessage()}
          </p>
        </div>
        <p className="flex space-x-2">
          <span>Max : {maxTemp}°</span>
          <span>Min : {minTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
