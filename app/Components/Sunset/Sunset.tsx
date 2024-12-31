"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { sunset } from '@/app/utils/Icons';
import { convertToIST } from '@/app/utils/misc';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Sunset() {
    const { forecast } = useGlobalContext();


    
    if (!forecast) {
        return <Skeleton className='h-[12rem] w-full' />;
    }

    const daily = forecast.daily;

    
    if (!daily || !daily.sunset?.length || !daily.sunrise?.length) {
        console.warn('Missing sunrise or sunset data');
        return  <Skeleton className='h-[12rem] w-full' />;
    }

    
    const sunsetRaw = daily.sunset[0];
    const sunriseRaw = daily.sunrise[0];

   
    const sunsetTime = sunsetRaw ? convertToIST(sunsetRaw) : 'No data';
    const sunriseTime = sunriseRaw ? convertToIST(sunriseRaw) : 'No data';

    return (
        <div className='col-span-full sm-2:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none'>
            <div className="top">
              <h2 className='flex items-center gap-2 font-medium'>{sunset}Sunset</h2>
              <p className='pt-4 text-2xl'>{sunsetTime}</p>
            </div>
            <p>Sunrise- {sunriseTime}</p>
        </div>
    );
}

export default Sunset;
