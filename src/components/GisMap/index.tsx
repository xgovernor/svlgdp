/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { memo } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import MapControls from '../MapControls'
import CoordinatesDisplay from '../CoordinatesDisplay'
import Leaflet from 'leaflet'


const MAP_CENTER = { lat: 22.0716, lng: 89.4672 } // Mangrove Forest.

const GisMap = () => {
    const [map, setMap] = React.useState<Leaflet.Map | null>(null);

    return (
        <>
            <MapContainer
                center={MAP_CENTER}
                zoom={9.5}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                attributionControl={false}
                ref={setMap}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapControls />
                <CoordinatesDisplay />
            </MapContainer>
        </>
    )
}

export default memo(GisMap)
