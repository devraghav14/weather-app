"use client";
import React from "react";


import { useGlobalContext } from "@/app/context/globalContext";
import TableComponent from "./TableComponent";
import { Skeleton } from "@/components/ui/skeleton";

function TabularRep() {
  const { legacy } = useGlobalContext();

  if(!legacy){
    return  <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  }

  const columns = [
    { key: "date", header: "Date" },
    { key: "maxTemp", header: "Max Temp (°C)" },
    { key: "minTemp", header: "Min Temp (°C)" },
    { key: "meanTemp", header: "Mean Temp (°C)" },
    { key: "maxApparentTemp", header: "Max Apparent Temp (°C)" },
    { key: "minApparentTemp", header: "Min Apparent Temp (°C)" },
    { key: "meanApparentTemp", header: "Mean Apparent Temp (°C)" },
  ];

  const data = (legacy?.daily?.time || []).map((_: any, index: number) => ({
    date: new Date(legacy?.daily?.time?.[index] || "").toLocaleDateString("en-GB"),
    maxTemp: legacy?.daily?.temperature_2m_max?.[index] || "N/A",
    minTemp: legacy?.daily?.temperature_2m_min?.[index] || "N/A",
    meanTemp: legacy?.daily?.temperature_2m_mean?.[index] || "N/A",
    maxApparentTemp: legacy?.daily?.apparent_temperature_max?.[index] || "N/A",
    minApparentTemp: legacy?.daily?.apparent_temperature_min?.[index] || "N/A",
    meanApparentTemp: legacy?.daily?.apparent_temperature_mean?.[index] || "N/A",
  }));

  return <TableComponent columns={columns} data={data} entriesPerPage={5}  />;
}

export default TabularRep;
