"use client";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Mapbox'), { ssr: false });

export default Map;