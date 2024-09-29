import { memo } from "react";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

interface GeoJsonLayerProps {
    url: string,
    name: string,
    style?: Record<string, unknown>,
}
const GeoJsonLayer = ({ url, name }: GeoJsonLayerProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, isLoading } = useSWR<GeoJsonObject>(url, fetcher);

    if (error) {
        console.error('Error loading CH4 metadata:', error);
    }

    return (
        data && (
            <GeoJSON
                data={data}
                style={() => ({
                    color: '#FF7800',
                    weight: 2,
                    opacity: 0.65,
                })}
                onEachFeature={(feature, layer) => {
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(`${name} Source: ${feature.properties.name}`);
                    }
                }}
            />
        )
    );
};

export default memo(GeoJsonLayer);
