import { memo, useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject, Feature, Geometry, FeatureCollection } from "geojson";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import L from "leaflet";

interface GeoJsonLayerProps {
    url: string;
    name: string;
    style?: L.PathOptions;
    interactive?: boolean;
    onFeatureClick?: (feature: Feature<Geometry>, layer: L.Layer) => void;
}

const GeoJsonLayer = ({ url, name, style, interactive = true, onFeatureClick }: GeoJsonLayerProps) => {
    // Fetch the GeoJSON data with error handling
    const { data, error, isLoading } = useSWR<GeoJsonObject>(url, fetcher, {
        errorRetryCount: 3,
        errorRetryInterval: 1000,
        revalidateOnFocus: false,
    });

    // Memoize style calculations for performance
    const featureStyles = useMemo(() => {
        if (!data) return {};

        const styles: Record<string, L.PathOptions> = {};

        // Type guard to check if data is a FeatureCollection
        const isFeatureCollection = (obj: GeoJsonObject): obj is FeatureCollection => {
            return obj.type === 'FeatureCollection' && 'features' in obj;
        };

        if (isFeatureCollection(data) && data.features) {
            data.features.forEach((feature: Feature<Geometry>, index: number) => {
                const color = feature.properties?.color || '#3388ff'; // Default Leaflet blue
                const geometryType = feature.geometry?.type;

                if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
                    styles[index] = {
                        fillColor: color,
                        weight: 2,
                        opacity: 1,
                        color: '#ffffff',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        ...style,
                    };
                } else {
                    styles[index] = {
                        color: color,
                        weight: 3,
                        opacity: 0.8,
                        ...style,
                    };
                }
            });
        }

        return styles;
    }, [data, style]);

    if (error) {
        console.error(`Error loading GeoJSON for ${name}:`, error);
        return null;
    }

    if (isLoading) {
        return null; // Don't show loading text on map
    }

    if (!data) {
        return null;
    }

    // Function to create comprehensive popup content
    const createPopupContent = (feature: Feature<Geometry>): string => {
        const props = feature.properties;

        if (!props) {
            return `<div><h3>${name}</h3><p>No additional data available</p></div>`;
        }

        // Soil data popup
        if (props.district_code) {
            const fields = [
                { label: 'pH', value: props.pH, unit: '' },
                { label: 'Nitrogen', value: props.nitrogen, unit: '%' },
                { label: 'Phosphorus', value: props.phosphorus, unit: '%' },
                { label: 'Potassium', value: props.potassium, unit: '%' },
                { label: 'Soil Type', value: props.soil_type, unit: '' },
                { label: 'Area', value: props.area_km2, unit: ' km²' },
            ];

            const fieldsHtml = fields
                .filter(field => field.value !== undefined && field.value !== null)
                .map(field => `<p><strong>${field.label}:</strong> ${field.value}${field.unit}</p>`)
                .join('');

            return `
                <div style="min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0; color: #2563eb;">${props.name} District</h3>
                    ${fieldsHtml}
                </div>
            `;
        }

        // Weather station popup
        if (props.station_name || props.temperature || props.humidity) {
            return `
                <div style="min-width: 180px;">
                    <h3 style="margin: 0 0 10px 0; color: #2563eb;">${props.station_name || 'Weather Station'}</h3>
                    ${props.temperature ? `<p><strong>Temperature:</strong> ${props.temperature}°C</p>` : ''}
                    ${props.humidity ? `<p><strong>Humidity:</strong> ${props.humidity}%</p>` : ''}
                    ${props.wind_speed ? `<p><strong>Wind Speed:</strong> ${props.wind_speed} m/s</p>` : ''}
                    ${props.elevation ? `<p><strong>Elevation:</strong> ${props.elevation} m</p>` : ''}
                </div>
            `;
        }

        // Water quality popup
        if (props.water_quality || props.dissolved_oxygen) {
            return `
                <div style="min-width: 180px;">
                    <h3 style="margin: 0 0 10px 0; color: #2563eb;">Water Quality Station</h3>
                    ${props.water_quality ? `<p><strong>Quality Index:</strong> ${props.water_quality}</p>` : ''}
                    ${props.dissolved_oxygen ? `<p><strong>Dissolved Oxygen:</strong> ${props.dissolved_oxygen} mg/L</p>` : ''}
                    ${props.turbidity ? `<p><strong>Turbidity:</strong> ${props.turbidity} NTU</p>` : ''}
                    ${props.ph_level ? `<p><strong>pH Level:</strong> ${props.ph_level}</p>` : ''}
                </div>
            `;
        }

        // Generic popup for other features
        const displayName = props.name || props.title || props.label || `${name} Feature`;
        const additionalFields = Object.entries(props)
            .filter(([key, value]) =>
                !['name', 'title', 'label', 'color'].includes(key) &&
                value !== undefined &&
                value !== null
            )
            .map(([key, value]) => `<p><strong>${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> ${value}</p>`)
            .join('');

        return `
            <div style="min-width: 150px;">
                <h3 style="margin: 0 0 10px 0; color: #2563eb;">${displayName}</h3>
                ${additionalFields}
            </div>
        `;
    };

    return (
        <GeoJSON
            key={url} // Force re-render when URL changes
            data={data}
            interactive={interactive}
            style={(feature) => {
                if (!feature) return {};

                const color = feature.properties?.color;
                const geometryType = feature.geometry?.type;

                // Different styles for polygons vs points/lines
                if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
                    return {
                        fillColor: color,
                        weight: 2,
                        opacity: 1,
                        color: '#ffffff',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        ...style,
                    };
                }

                // Style for lines and other geometries
                return {
                    color: color,
                    weight: 3,
                    opacity: 0.8,
                    ...style,
                };
            }}
            // Customize point markers based on feature properties
            pointToLayer={(feature, latlng) => {
                const color = feature.properties?.color;
                const props = feature.properties;

                // Different marker sizes based on data importance
                let radius = 8;
                if (props?.importance === 'high') radius = 12;
                if (props?.importance === 'low') radius = 6;

                const markerStyle: L.CircleMarkerOptions = {
                    radius,
                    fillColor: color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                };

                return L.circleMarker(latlng, markerStyle);
            }}
            onEachFeature={(feature, layer) => {
                // Attach popups to each feature
                const popupContent = createPopupContent(feature);
                layer.bindPopup(popupContent, {
                    maxWidth: 300,
                    closeButton: true,
                    autoPan: true,
                });

                // Add hover effects for better UX
                layer.on({
                    mouseover: (e) => {
                        const layer = e.target;
                        if (layer.setStyle && feature.geometry?.type !== 'Point') {
                            layer.setStyle({
                                weight: 3,
                                fillOpacity: 0.9,
                            });
                        }
                    },
                    mouseout: (e) => {
                        const layer = e.target;
                        if (layer.setStyle && feature.geometry?.type !== 'Point') {
                            layer.setStyle({
                                weight: 2,
                                fillOpacity: 0.7,
                            });
                        }
                    },
                    click: (e) => {
                        // Custom click handler if provided
                        if (onFeatureClick) {
                            onFeatureClick(feature, layer);
                        }

                        // Auto-zoom to feature bounds on click for polygons
                        if (feature.geometry?.type === 'Polygon' || feature.geometry?.type === 'MultiPolygon') {
                            const bounds = (layer as any).getBounds();
                            if (bounds && bounds.isValid()) {
                                e.target._map.fitBounds(bounds, { padding: [20, 20] });
                            }
                        }
                    },
                });
            }}
        />
    );
};

export default memo(GeoJsonLayer);
