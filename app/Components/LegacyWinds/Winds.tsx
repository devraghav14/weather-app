"use client";

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/app/context/globalContext';
import { wind } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import Compass from './Compass'; 

function LegacyWinds() {
  const { legacy } = useGlobalContext();
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const [windData, setWindData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (
      legacy &&
      legacy.daily &&
      legacy.daily.wind_direction_10m_dominant &&
      legacy.daily.wind_speed_10m_max &&
      legacy.daily.time
    ) {
      const windDirs = legacy.daily.wind_direction_10m_dominant;
      const windSpeeds = legacy.daily.wind_speed_10m_max;
      const dates = legacy.daily.time;

      const currentWindData = windDirs.map((dir: number, index: number) => ({
        dir,
        speed: windSpeeds[index],
        date: new Date(dates[index]).toLocaleDateString('en-GB'),
      }));

      setWindData(currentWindData);
      setLoading(false);
    }
  }, [legacy]);

  if (loading) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWindData = windData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(windData.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div className="pt-6 px-4 h-auto border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium mb-4">{wind} Wind Data</h2>
      <div className="grid grid-cols-1 gap-4">
        {currentWindData.map((data, index) => (
          <Compass key={index} windDir={data.dir} windSpeed={data.speed} date={data.date} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LegacyWinds;
