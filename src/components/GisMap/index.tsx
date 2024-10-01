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
import { IOverlay, useMap } from '@/store/map';

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

const GisUI = () => {
    const [map, setMap] = useState<Leaflet.Map | null>(null);
    const { layers, layer, overlays, overlay } = useMap();

    // useEffect(() => {
    //     if (!map) return;

    //     map.on('click', (e) => {
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         const { lat, lng } = e.latlng;
    //         console.log(lat, lng);
    //     });
    // }, [map]);

    return (
        <ErrorBoundary>
            <MapContainer
                className="w-full z-0"
                center={MAP_CENTER}
                zoom={9}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={true}
                ref={setMap}
            >
                <LayersControl position="topleft">
                    {layers.map(({ name, ...rest }, index) => (
                        <LayersControl.BaseLayer key={index} name={name} checked={rest.url === layer.url}>
                            <TileLayer
                                {...rest}
                                errorTileUrl="/path/to/error-tile.png" // Optional for fallback
                            />
                        </LayersControl.BaseLayer>
                    ))}
                </LayersControl>

                <LayersControl position="topleft">
                    {/* "700-1400 nm z score": band2,
                    // "381-2492 nm z score": band1,
                    // "NDVI": NDVI,
                    // "NDWI": NDWI,
                    // "NDFI": NDFI,
                    */}

                    {overlays.map(({ name, ...rest }, index) => {
                        const checked = overlay.filter((item) => item.url === rest.url)[0] ? true : false;
                        return (
                            <LayersControl.Overlay key={index} name={name} checked={checked}>
                                <GeoJsonLayer name={name} {...rest} />
                            </LayersControl.Overlay>
                        )
                    })}
                </LayersControl>

                <MapControls />
                <CoordinatesDisplay />
            </MapContainer>
        </ErrorBoundary>
    );
};

export default memo(GisUI);
