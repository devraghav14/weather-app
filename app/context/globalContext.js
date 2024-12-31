"use client";
import React, { useEffect, useState, useContext, createContext } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [legacy, setLegacy] = useState({});
  const [error, setError] = useState(null);
  const [airQuality, setAirQuality] = useState({});
  const [inputLat, setInputLat] = useState("");
  const [inputLong, setInputLong] = useState("");
  const [fromDate, setFromDate] = useState("2024-12-12");
  const [toDate, setToDate] = useState("2024-12-19");

  const [activeDates, setActiveDates] = useState(["2024-12-12", "2024-12-19"]);

  const [activeCityCoords, setActiveCityCoords] = useState([28.7, 77.1]);

  const fetchWeatherData = async (lat, lon, from, to) => {
    try {
      const res = await fetch(
        `/api/weather?lat=${lat}&lon=${lon}&from=${from}&to=${to}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }

      const data = await res.json();
      setForecast(data.forecast || {});
      setLegacy(data.legacy || {});
    } catch (err) {
      console.error("Error fetching weather data:", err.message);
      setError("Failed to fetch weather data.");
    }
  };

  const updateActiveCityCoords = () => {
    if (inputLat && inputLong && fromDate && toDate) {
      if (new Date(fromDate) >= new Date(toDate)) {
        setError("From date must be earlier than the to date.");
        return;
      }

      setActiveCityCoords([parseFloat(inputLat), parseFloat(inputLong)]);
      setActiveDates([fromDate, toDate]);

      fetchWeatherData(
        parseFloat(inputLat),
        parseFloat(inputLong),
        fromDate,
        toDate
      );
      fetchAirQuality(parseFloat(inputLat), parseFloat(inputLong));
    } else {
      setError("Please enter valid latitude and longitude values.");
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await fetch(`/api/pollution?lat=${lat}&lon=${lon}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      const data = await res.json();

      setAirQuality(data || {});
    } catch (error) {
      console.log("Error fetching pollution data:", error.message);
      setError("Failed to fetch pollution data");
    }
  };

  const handleInputLat = (e) => {
    setInputLat(e.target.value);
  };

  const handleInputLong = (e) => {
    setInputLong(e.target.value);
  };

  useEffect(() => {
    fetchWeatherData(
      activeCityCoords[0],
      activeCityCoords[1],
      activeDates[0],
      activeDates[1]
    );
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords, activeDates]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        legacy,
        airQuality,
        error,
        inputLong,
        inputLat,
        handleInputLat,
        handleInputLong,
        updateActiveCityCoords,
        activeCityCoords,
        fromDate,
        toDate,
        setFromDate,
        setToDate,
      }}
    >
      <GlobalContextUpdate.Provider value={{ fetchWeatherData }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
