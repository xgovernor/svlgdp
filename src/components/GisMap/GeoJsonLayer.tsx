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

    // Function to get color based on data type and properties
    const getFeatureColor = (feature: any) => {
        const props = feature.properties;

        // Soil Type Polygons - color by fertility index
        if (props?.soilType && props?.fertilityIndex) {
            const fertility = props.fertilityIndex;
            if (fertility >= 8) return "#2E7D32"; // Dark green for high fertility
            if (fertility >= 6) return "#66BB6A"; // Medium green
            if (fertility >= 4) return "#FFA726"; // Orange for medium fertility
            return "#E57373"; // Red for low fertility
        }

        // Weather stations - color by temperature
        if (props?.temperature) {
            const temp = props.temperature;
            if (temp >= 35) return "#B71C1C"; // Dark red for very hot
            if (temp >= 30) return "#FF5722"; // Red orange for hot
            if (temp >= 25) return "#FF9800"; // Orange for warm
            return "#2196F3"; // Blue for cool
        }

        // Water quality - color by pH
        if (props?.pH && props?.dissolvedOxygen) {
            const ph = props.pH;
            if (ph >= 8) return "#9C27B0"; // Purple for alkaline
            if (ph >= 7) return "#4CAF50"; // Green for neutral
            return "#FF5722"; // Red for acidic
        }

        // Soil data districts - color by pH
        if (props?.pH && props?.nitrogen) {
            const ph = props.pH;
            if (ph >= 7.5) return "#8BC34A"; // Light green for alkaline
            if (ph >= 6.5) return "#4CAF50"; // Green for neutral
            return "#FF9800"; // Orange for acidic
        }

        // Default colors for other data
        if (props?.Difference !== undefined) {
            return props.Difference < 0 ? "#FF0000" : "#008000";
        }

        return "#FF7800"; // Default orange
    };

    // Function to create popup content based on feature properties
    const createPopupContent = (feature: any) => {
        const props = feature.properties;

        if (props?.soilType) {
            return `
                <div>
                    <h3>${props.soilType}</h3>
                    <p><strong>Region:</strong> ${props.region}</p>
                    <p><strong>Fertility Index:</strong> ${props.fertilityIndex}/10</p>
                    <p><strong>pH Level:</strong> ${props.phLevel}</p>
                    <p><strong>Organic Matter:</strong> ${props.organicMatter}%</p>
                    <p><strong>Primary Crop:</strong> ${props.primaryCrop}</p>
                    <p><strong>Drainage:</strong> ${props.drainageClass}</p>
                    <p><strong>Area:</strong> ${props.area_hectares?.toLocaleString()} hectares</p>
                </div>
            `;
        }

        if (props?.station_name) {
            return `
                <div>
                    <h3>${props.station_name}</h3>
                    <p><strong>Temperature:</strong> ${props.temperature}°C</p>
                    <p><strong>Rainfall:</strong> ${props.rainfall}mm</p>
                    <p><strong>Humidity:</strong> ${props.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${props.wind_speed} km/h</p>
                    <p><strong>Pressure:</strong> ${props.pressure} hPa</p>
                </div>
            `;
        }

        if (props?.monitoring_id) {
            return `
                <div>
                    <h3>${props.location_name}</h3>
                    <p><strong>Water Body:</strong> ${props.water_body}</p>
                    <p><strong>pH:</strong> ${props.pH}</p>
                    <p><strong>Salinity:</strong> ${props.salinity} ppt</p>
                    <p><strong>Turbidity:</strong> ${props.turbidity} NTU</p>
                    <p><strong>Dissolved Oxygen:</strong> ${props.dissolvedOxygen} mg/L</p>
                    <p><strong>Temperature:</strong> ${props.temperature}°C</p>
                </div>
            `;
        }

        if (props?.district_code) {
            return `
                <div>
                    <h3>${props.name} District</h3>
                    <p><strong>pH:</strong> ${props.pH}</p>
                    <p><strong>Nitrogen:</strong> ${props.nitrogen}%</p>
                    <p><strong>Phosphorus:</strong> ${props.phosphorus}%</p>
                    <p><strong>Potassium:</strong> ${props.potassium}%</p>
                    <p><strong>Soil Type:</strong> ${props.soil_type}</p>
                    <p><strong>Area:</strong> ${props.area_km2} km²</p>
                </div>
            `;
        }

        // Default popup for other features
        if (props?.name) {
            return `${name} Source: ${props.name}`;
        }

        return `${name} Feature`;
    };

    return (
        data && (
            <GeoJSON
                data={data}
                style={(feature) => {
                    const color = getFeatureColor(feature);

                    // Different styles for polygons vs points
                    if (feature?.geometry?.type === 'Polygon' || feature?.geometry?.type === 'MultiPolygon') {
                        return {
                            fillColor: color,
                            weight: 2,
                            opacity: 1,
                            color: '#ffffff',
                            dashArray: '3',
                            fillOpacity: 0.7
                        };
                    }

                    // Style for lines and other geometries
                    return style || {
                        height: 4,
                        width: 4,
                        color: color,
                        weight: 2,
                        opacity: 0.65,
                    };
                }}
                // Customize point markers based on feature properties
                pointToLayer={(feature, latlng) => {
                    const color = getFeatureColor(feature);

                    const markerStyle = {
                        radius: 8,
                        fillColor: color,
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8,
                    };

                    // Create a circle marker with custom style
                    return L.circleMarker(latlng, markerStyle);
                }}
                onEachFeature={(feature, layer) => {
                    // Attach popups to each feature
                    const popupContent = createPopupContent(feature);
                    layer.bindPopup(popupContent);
                }}
            />
        )
    );
};

export default memo(GeoJsonLayer);
