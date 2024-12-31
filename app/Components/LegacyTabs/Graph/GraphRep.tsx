"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
    minTemp: {
      label: "Min Temp",
      color: "hsl(var(--chart-1))", 
    },
    maxTemp: {
      label: "Max Temp",
      color: "hsl(var(--chart-2))", 
    },
    meanTemp: {
      label: "Mean Temp",
      color: "hsl(var(--chart-3))", 
    },
    maxApparentTemp: {
      label: "Max Apparent",
      color: "hsl(var(--chart-4))",
    },
    minApparentTemp: {
      label: "Min Apparent",
      color: "hsl(var(--chart-5))", 
    },
    meanApparentTemp: {
      label: "Mean Apparent",
      color: "hsl(var(--chart-6))", 
    },
  } satisfies ChartConfig;
  

export function GraphicalRep() {
   const { legacy } = useGlobalContext();
  if(!legacy){
    return  <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  }

  const displayFrom = legacy?.daily?.time[0];
  const displayTo = legacy?.daily?.time[legacy?.daily?.time.length - 1];

  let legacyTempData: {
    date: string;
    minTemp: number;
    maxTemp: number;
    meanTemp: number;
    maxApparentTemp: number;
    minApparentTemp: number;
    meanApparentTemp: number;
  }[] = [];

  legacy?.daily?.time?.forEach((_:any, index: number) => {
    legacyTempData.push({
        date: new Date(legacy.daily.time[index] || '').toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short', 
            day: '2-digit',
          }),
      minTemp: legacy.daily.temperature_2m_min?.[index] || null,
      maxTemp: legacy.daily.temperature_2m_max?.[index] || null,
      meanTemp: legacy.daily.temperature_2m_mean?.[index] || null,
      maxApparentTemp: legacy.daily.apparent_temperature_max?.[index] || null,
      minApparentTemp: legacy.daily.apparent_temperature_min?.[index] || null,
      meanApparentTemp: legacy.daily.apparent_temperature_mean?.[index] || null,
    });
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Graphical Description of temperatures</CardTitle>
        <CardDescription>{displayFrom} to {displayTo}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={legacyTempData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line 
              dataKey="minTemp" 
              type="monotone"
              stroke="var(--color-minTemp)" 
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="maxTemp" 
              type="monotone"
              stroke="var(--color-maxTemp)" 
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="meanTemp" 
              type="monotone"
              stroke="var(--color-meanTemp)" 
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="minApparentTemp" 
              type="monotone"
              stroke="var(--color-minApparentTemp)" 
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="maxApparentTemp" 
              type="monotone"
              stroke="var(--color-maxApparentTemp)" 
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="meanApparentTemp" 
              type="monotone"
              stroke="var(--color-meanApparentTemp)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              All values are in °C
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
