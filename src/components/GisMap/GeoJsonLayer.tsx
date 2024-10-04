import { memo } from "react";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import L from "leaflet"; // Import Leaflet to create custom markers

interface GeoJsonLayerProps {
    url: string;
    name: string;
    style?: Record<string, unknown>;
}

const GeoJsonLayer = ({ url, name, style }: GeoJsonLayerProps) => {
// Fetch the GeoJSON data
    const { data, error, isLoading } = useSWR<GeoJsonObject>(url, fetcher);

    if (error) {
        console.error('Error loading metadata:', error);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        data && (
            <GeoJSON
                data={data}
                style={style || {
                    height: 4,
                    width: 4,
                    color: '#FF7800',
                    weight: 2,
                    opacity: 0.65,
                }}
                // Customize point markers based on feature properties
                pointToLayer={(feature, latlng) => {
                    const markerStyle = {
                        radius: 8,
                        fillColor: "#FF7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8,
                    };

                    // Check for a "Color" property in the feature and apply a different style
                    if (feature.properties && feature.properties.Difference < 0) {
                        markerStyle.fillColor = "#FF0000"; // Red color for negative valuesGeoJSON properties
                    } else if (feature.properties && feature.properties.Difference > 0) {
                        markerStyle.fillColor = "#008000"; // Green color for positive values
                    }

                    // Create a circle marker with custom style
                    return L.circleMarker(latlng, markerStyle);
                }}
                onEachFeature={(feature, layer) => {
                    // Attach popups to each feature (marker)
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(`${name} Source: ${feature.properties.name}`);
                    }
                }}
            />
        )
    );
};

export default memo(GeoJsonLayer);
