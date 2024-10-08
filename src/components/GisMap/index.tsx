/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { memo, useEffect, useState, } from 'react';
import {
    MapContainer,
    TileLayer,
    LayersControl,
    Marker
} from 'react-leaflet';
import Leaflet, { HeatLatLngTuple, Icon } from 'leaflet';
import MapControls from '../MapControls';
import CoordinatesDisplay from '../CoordinatesDisplay';
import 'leaflet/dist/leaflet.css';
import GeoJsonLayer from './GeoJsonLayer';
import ErrorBoundary from '../ErrorBoundary';
import { useMap } from '@/store/map';
import "leaflet.heat";

const GisUI = () => {
    const [map, setMap] = useState<Leaflet.Map | null>(null);
    const { center, layers, layer, overlays, overlay } = useMap();

    useEffect(() => {
        if (!map) return;

    // Create a heatmap layer
    // Leaflet.heatLayer(rainfallHeatData, { radius: 25 }).addTo(map);

    //     map.on('click', (e) => {
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         const { lat, lng } = e.latlng;
    //         console.log(lat, lng);
    //     });


    // Function to add WMTS layer

    }, [map]);



    return (
        <ErrorBoundary>
            <MapContainer
                // crs={L.CRS.Simple}
                className="w-full z-0"
                center={center}
                minZoom={2}
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
                    {overlays.map(({ name, ...rest }, index) => {
                        const checked = overlay.filter((item) => item.url === rest.url)[0] ? true : false;
                        return (
                            <LayersControl.Overlay key={index} name={name} checked={checked}>
                                <GeoJsonLayer name={name} {...rest} />
                            </LayersControl.Overlay>
                        )
                    })}


                    {/* <LayersControl.Overlay name="Rainfall difference (2010 - 2022)" checked={true}>
                        {rainfallHeatData.map((point, index) => (
                            <Marker
                                key={index}
                                position={[point[0], point[1]]}
                                icon={new Icon({
                                    iconUrl: point[2] < 0 ? '/red-icon.png' : '/green-icon.png',
                                    iconSize: [25, 41],
                                })}
                            />
                        ))}
                    </LayersControl.Overlay> */}
                </LayersControl>

                <MapControls />
                <CoordinatesDisplay />
            </MapContainer>
        </ErrorBoundary>
    );
};

export default memo(GisUI);
