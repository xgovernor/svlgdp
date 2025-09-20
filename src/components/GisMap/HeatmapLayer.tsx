"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { LayerGroup, useMap as useLeafletMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import type { Feature, FeatureCollection, Point } from "geojson";

interface HeatmapLayerProps {
  url: string;
  name?: string;
  radius?: number; // pixels
  blur?: number; // pixels
  maxZoom?: number;
  minOpacity?: number;
  maxIntensity?: number; // default 1.0
  gradient?: Record<number, string>;
}

const HeatmapLayer = ({
  url,
  radius = 20,
  blur = 15,
  maxZoom = 17,
  minOpacity = 0.35,
  maxIntensity = 1.0,
  gradient,
}: HeatmapLayerProps) => {
  const map = useLeafletMap();
  const groupRef = useRef<L.LayerGroup | null>(null);

  const { data } = useSWR<FeatureCollection>(url, fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 2,
  });

  // Pre-compute min/max nitrogen for normalization when intensity is missing
  const stats = useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    if (data?.features) {
      for (const f of data.features) {
        if (f.geometry?.type === "Point") {
          const n = (f.properties as any)?.nitrogen_kg_ha as number | undefined;
          if (typeof n === "number") {
            if (n < min) min = n;
            if (n > max) max = n;
          }
        }
      }
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return { min: 0, max: 1 };
    }
    if (min === max) {
      // Avoid divide-by-zero; spread slightly
      return { min: 0, max: max || 1 };
    }
    return { min, max };
  }, [data]);

  useEffect(() => {
    if (!map || !data || !groupRef.current) return;

    const pts: Array<[number, number, number]> = [];
    for (const f of data.features) {
      if (f.geometry?.type !== "Point") continue;
      const coords = (f.geometry as Point).coordinates; // [lng, lat]
      const props = (f as Feature<Point>).properties as any;
      let intensity: number | undefined = props?.intensity;

      if (typeof intensity !== "number" || intensity < 0 || intensity > 1) {
        const n = props?.nitrogen_kg_ha as number | undefined;
        if (typeof n === "number") {
          const { min, max } = stats;
          const t = max - min;
          // Normalize to [0, 1] and clamp; bias to keep visibility
          const norm = t > 0 ? (n - min) / t : 0.5;
          intensity = Math.min(1, Math.max(0.15, norm));
        } else {
          intensity = 0.3;
        }
      }

      // Heat layer expects [lat, lng, intensity]
      pts.push([coords[1], coords[0], intensity]);
    }

    const heat = (L as any).heatLayer(pts, {
      radius,
      blur,
      maxZoom,
      minOpacity,
      max: maxIntensity,
      gradient,
    });

  // Add heat layer into the LayerGroup so LayersControl can toggle it
  groupRef.current.addLayer(heat);

    return () => {
      try {
        heat.remove();
      } catch (_) {
        // ignore
      }
    };
    // We intentionally exclude radius/blur/etc from deps so LayersControl toggle doesn't recreate excessively
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, data, stats.min, stats.max, groupRef.current]);

  return <LayerGroup ref={groupRef as any} />;
};

export default memo(HeatmapLayer);
