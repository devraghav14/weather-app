import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";


const cache = new NodeCache({ stdTTL: 600 });

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get('lat') || '28.70';
    const long = searchParams.get('lon') || '77.10';
    const startDate = searchParams.get('from') || '2024-12-11'; 
    const endDate = searchParams.get('to') || '2024-12-19'; 

    
    const cacheKey = `${lat}-${long}`;

    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData); 
    }

    // Weather API URLs
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&forecast_days=1`;

    const legacyUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean,sunrise,sunset,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant`;

    console.log("Query Params - lat:", lat, "long:", long, "startDate:", startDate, "endDate:", endDate);

    const [forecastResponse, legacyResponse] = await Promise.all([
      fetch(forecastUrl),
      fetch(legacyUrl),
    ]);

    if (!forecastResponse.ok) {
      throw new Error(`Weather API request failed with status: ${forecastResponse.status}`);
    }

    if (!legacyResponse.ok) {
      throw new Error(`Legacy Weather API request failed with status: ${legacyResponse.status}`);
    }

    const forecastData = await forecastResponse.json();
    const legacyData = await legacyResponse.json();

    
    const responseData = {
      forecast: forecastData,
      legacy: legacyData,
    };
    cache.set(cacheKey, responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching forecast data:", error);

    return NextResponse.json(
      {
        error: "Error fetching forecast data",
      },
      { status: 500 }
    );
  }
}
