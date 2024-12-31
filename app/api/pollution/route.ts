import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";


const cache = new NodeCache({ stdTTL: 600, checkperiod: 60 }); 

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;

        
        const { searchParams } = new URL(req.url);
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        if (!lat || !lon) {
            return new Response("Latitude and Longitude are required", { status: 400 });
        }

        
        const cacheKey = `${lat},${lon}`;

        
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            console.log("Returning cached data");
            return NextResponse.json(cachedData); 
        }

        
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch pollution data");
        }

        const pollutionData = await res.json();

       
        cache.set(cacheKey, pollutionData);

        return NextResponse.json(pollutionData);
    } catch (error) {
        console.log("Error in getting pollution data", error);
        return new Response("Error fetching pollution data", { status: 500 });
    }
}
