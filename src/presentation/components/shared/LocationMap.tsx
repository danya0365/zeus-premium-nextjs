"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

interface LocationMapProps {
  longitude?: number;
  latitude?: number;
  zoom?: number;
  className?: string;
  popupText?: string;
}

export function LocationMap({
  longitude = 100.5018, // Default BKK
  latitude = 13.7563,
  zoom = 15,
  className = "w-full h-96 rounded-2xl overflow-hidden shadow-lg",
  popupText = "Zeus Premium Co., Ltd.",
}: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [longitude, latitude],
      zoom: zoom,
      scrollZoom: false, // Prevent accidental scrolling while scrolling the page
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Load Thailand GeoJSON
      map.addSource("thailand", {
        type: "geojson",
        data: "/data/thailand.geojson",
      });

      // Add Thailand Fill Layer (subtle highlight)
      map.addLayer({
        id: "thailand-fill",
        type: "fill",
        source: "thailand",
        paint: {
          "fill-color": "#2563EB", // Zeus Blue
          "fill-opacity": 0.1,
        },
      });

      // Add Thailand Border Layer
      map.addLayer({
        id: "thailand-border",
        type: "line",
        source: "thailand",
        paint: {
          "line-color": "#2563EB",
          "line-width": 2,
          "line-opacity": 0.5,
        },
      });

      // Custom Marker Element
      const el = document.createElement("div");
      el.className = "w-10 h-10 bg-zeus-blue rounded-full border-4 border-white shadow-xl flex items-center justify-center cursor-pointer";
      
      const icon = document.createElement("div");
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
      el.appendChild(icon);

      // Add Popup
      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`<h3 class="font-bold text-gray-900">${popupText}</h3><p class="text-sm text-gray-600">รับผลิตของพรีเมียมครบวงจร</p>`);

      // Add Marker to Map
      new maplibregl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [longitude, latitude, zoom, popupText]);

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
