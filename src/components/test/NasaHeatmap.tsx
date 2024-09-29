"use client";

import React, { memo, useMemo, useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import MapControls from '../MapControls'
import CoordinatesDisplay from '../CoordinatesDisplay'
import Leaflet from 'leaflet'
import 'leaflet.heat'

const MAP_CENTER = { lat: 22.0716, lng: 89.4672 } // Mangrove Forest.

interface HeatMapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

// HeatmapLayer component to add the heatmap to the map
const HeatmapLayer = ({ points }: { points: HeatMapPoint[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heat = Leaflet.heatLayer(
      points.map(p => [p.lat, p.lng, p.intensity]),
      { radius: 25, blur: 15, maxZoom: 17 }
    );

    map.addLayer(heat);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const GisMap = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<Leaflet.Map | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatMapPoint[]>([]);

  const layers = useMemo(() => {
    return [new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    })];
  }, []);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        // Replace with the actual NASA API or dataset URL
        const response = await fetch('https://nasa.gov/api/heatmap-data', {
          mode: 'no-cors'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch heatmap data');
        }

        const rawData = await response.json(); // Assuming the data is in JSON format

        // Parse the raw data to match the expected format (lat, lng, intensity)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const heatmapData: HeatMapPoint[] = rawData.map((point: any) => ({
          lat: point.latitude, // Replace with the actual field name from the NASA dataset
          lng: point.longitude, // Replace with the actual field name from the NASA dataset
          intensity: point.intensity // Replace with the actual field name for intensity
        }));

        // Update the state with the real heatmap data
        setHeatmapData(heatmapData);
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchHeatmapData();
  }, []);


  return (
    <div className="h-full w-full relative">
      <MapContainer
        className='h-full w-full z-0'
        center={MAP_CENTER}
        zoom={9.5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={true}
        ref={setMap}
        layers={layers}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer points={heatmapData} />
        <MapControls />
        <CoordinatesDisplay />
      </MapContainer>
    </div>
  )
}

export default memo(GisMap)
