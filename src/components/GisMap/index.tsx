/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { memo, useEffect, useState, } from 'react';
import {
    MapContainer,
    TileLayer,
    LayersControl
} from 'react-leaflet';
import Leaflet from 'leaflet';
import MapControls from '../MapControls';
import CoordinatesDisplay from '../CoordinatesDisplay';
import 'leaflet/dist/leaflet.css';
import GeoJsonLayer from './GeoJsonLayer';
import ErrorBoundary from '../ErrorBoundary';

// Error handling boundary

// Center of the Mangrove Forest for GIS
const MAP_CENTER = { lat: 22.0716, lng: 89.4672 };

// Helper to get today's date in NASA FIRMS format (yyyy-mm-dd)
const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

// Define base layers and overlays
const BaseLayer = ({
    name,
    url,
    maxZoom,
    attribution,
    checked = false,
    crs = 'EPSG3857', // Default CRS
}: {
    name: string;
    url: string;
    maxZoom: number;
    attribution: string;
    checked?: boolean;
    crs?: string;
}) => {
    return (
        <LayersControl.BaseLayer name={name} checked={checked}>
            <TileLayer
                url={url}
                maxZoom={maxZoom}
                attribution={attribution}
                errorTileUrl="/path/to/error-tile.png" // Optional for fallback
            />
        </LayersControl.BaseLayer>
    );
};

const GisUI = () => {
    const [map, setMap] = useState<Leaflet.Map | null>(null);

    useEffect(() => {
        if (!map) return;

        map.on('click', (e) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { lat, lng } = e.latlng;
            console.log(lat, lng);
        });
    }, [map]);

    return (
        <ErrorBoundary>
            <MapContainer
                className="h-full w-full z-0"
                center={MAP_CENTER}
                zoom={9}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={true}
                ref={setMap}
            >
                <LayersControl position="topleft">
                    {/* Base Layer: OpenStreetMap */}
                    <BaseLayer
                        name="OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={18}
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* ArcGIS World Imagery */}
                    <BaseLayer
                        name="ArcGIS World Imagery"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        maxZoom={18}
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, GeoEye, Getmapping, Aerogrid, IGN, IGP, Polygonizer,UIApplicationDelegate, Public domain'
                        checked={true}
                    />
                </LayersControl>

                <LayersControl position="topleft">
                    {/* "700-1400 nm z score": band2,
                    // "381-2492 nm z score": band1,
                    // "NDVI": NDVI,
                    // "NDWI": NDWI,
                    // "NDFI": NDFI,
                    */}

                    {/* Overlay: Rainfall */}
                    <LayersControl.Overlay name="Rainfall">
                        <GeoJsonLayer url="https://sustainable-caucasus.unepgrid.ch/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=geonode%3Amax_precipitation&outputFormat=json&srs=EPSG%3A28408&srsName=EPSG%3A28408" name="Rainfall" />
                    </LayersControl.Overlay>

                    {/* Overlay: CH4 Metadata */}
                    <LayersControl.Overlay name="Methane Metadata">
                        <GeoJsonLayer url="/data/methane-metadata.geojson" name="CH4" />
                    </LayersControl.Overlay>

                    {/* Overlay: CO2 Metadata */}
                    <LayersControl.Overlay name="Carbon Metadata">
                        <GeoJsonLayer url="/data/co2-metadata.geojson" name="CO2" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Study Area" checked={true}>
                        <GeoJsonLayer url="/data/study-area.geojson" name="Study Area" />
                    </LayersControl.Overlay>
                </LayersControl>

                <MapControls />
                <CoordinatesDisplay />
            </MapContainer>
        </ErrorBoundary>
    );
};

export default memo(GisUI);
