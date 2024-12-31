"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from '@/app/context/globalContext';

interface MapboxProps {
  lat?: number;
  lon?: number;
}

const Mapbox = ({ lat, lon }: MapboxProps) => {
  const { activeCityCoords } = useGlobalContext();
  const [contextLat, contextLon] = activeCityCoords;

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (map) {
        map.setView([contextLat, contextLon], map.getZoom());
      }
    }, [contextLat, contextLon, map]);

    return null;
  };

  return (
    <div className="mapbox-container flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[contextLat, contextLon]}
        zoom={8}
        className="rounded-lg m-4"
        scrollWheelZoom={false}
        style={{
          height: "calc(100% - 2rem)", 
          width: "calc(100% - 2rem)",  
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MapUpdater />
      </MapContainer>

      {/* TailwindCSS Media Query for small screens */}
      <style jsx>{`
        @media (max-width: 420px) {
          .mapbox-container {
            width: 100% !important;  
            height: 300px !important; 
          }

          .leaflet-container {
            width: 100% !important;  
            height: 100% !important; 
          }
        }
      `}</style>
    </div>
  );
};

export default Mapbox;
