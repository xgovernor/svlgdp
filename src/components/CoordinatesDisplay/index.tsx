"use client";

import { memo, SetStateAction, useState } from "react";
import { useMapEvents } from "react-leaflet";

const CoordinatesDisplay = () => {
    const [coords, setCoords] = useState({ lat: 0, lng: 0 })

    useMapEvents({
        mousemove: (e: { latlng: SetStateAction<{ lat: number; lng: number; }>; }) => setCoords(e.latlng),
    })

    return (
        <div className="w-44 py-1 px-2 text-[#CBD0D0] absolute bottom-4 right-4 bg-[#1B1B1F] rounded shadow z-[999] border border-black">
            Lat: {coords.lat.toFixed(4)}, Lng: {coords.lng.toFixed(4)}
        </div>
    )
}

export default memo(CoordinatesDisplay);
