import { create } from "zustand";

export type ILayerTypes =
  | "roadmap"
  | "satellite"
  | "hybrid"
  | "terrain"
  | "none";
export type IOverlayType = "satellite" | "none";

export interface ILayer {
  name: string;
  thumbnail?: string;
  url: string;
  maxZoom?: number;
  attribution?: string;
}

export interface IOverlay {
  name: string;
  thumbnail?: string;
  url: string;
  attribution?: string;
}

export interface IMapState {
  center: {
    lat: number; // Latitude
    lng: number; // Longitude
  };
  layers: ILayer[];
  layer: ILayer;
  overlays: IOverlay[];
  overlay: IOverlay[];
  toggleLayer: (layer: ILayer) => void;
  toggleOverlay: (overlay: IOverlay) => void;
}

const layers: ILayer[] = [
  {
    name: "ArcGIS World Imagery",
    maxZoom: 18,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, GeoEye, Getmapping, Aerogrid, IGN, IGP, Polygonizer,UIApplicationDelegate, Public domain",
  },
  {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    maxZoom: 18,
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: "OpenTopoMap",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    maxZoom: 17,
  },
];

const overlays: IOverlay[] = [
  {
    name: "Study area",
    url: "/data/study-area.geojson",
  },
  {
    name: "Carbon emissions",
    url: "/data/co2-metadata.geojson",
  },
  {
    name: "Methane emissions",
    url: "/data/methane-metadata.geojson",
  },
  {
    name: "Tropical Storm Leslie",
    url: "/data/tropical-storm-leslie.geojson",
  },
  {
    name: "Wilidfire",
    url: "/data/wildfire.geojson",
  },
  // {
  //   name: "Rainfall",
  //   url: "https://sustainable-caucasus.unepgrid.ch/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=geonode%3Amax_precipitation&outputFormat=json&srs=EPSG%3A28408&srsName=EPSG%3A28408",
  // },
];

export const useMap = create<IMapState>((set) => ({
  center: { lat: 22.0716, lng: 89.4672 },
  layers,
  layer: layers[0],
  overlays,
  overlay: [overlays[0]],
  toggleLayer: (layer) => set({ layer }),
  toggleOverlay: (overlay) => {
    let { overlay: overlays } = useMap.getState();

    if (overlays.length === 0) {
      overlays = [overlay];
    } else if (overlays.includes(overlay)) {
      overlays = overlays.filter((o) => o !== overlay);
    } else if (!overlays.includes(overlay)) {
      overlays.push(overlay);
    }

    set({ overlay: overlays });
  },
}));
