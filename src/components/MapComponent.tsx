import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Job } from "../types";
import { JobPopup } from "./JobPopup";
import { createRoot } from "react-dom/client";

interface MapComponentProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  savedJobs: string[];
  onSaveJob: (jobId: string) => void;
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A";

export function MapComponent({
  jobs,
  onJobSelect,
  savedJobs,
  onSaveJob,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const openPopupRef = useRef<mapboxgl.Popup | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  // Step 1: Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.longitude, pos.coords.latitude]),
      () => setUserLocation([35.21, 31.77]), // fallback Palestine
      { enableHighAccuracy: true }
    );
  }, []);

  // Step 2: Initialize map once
  useEffect(() => {
    if (!userLocation || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: userLocation,
      zoom: 12,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker({ color: "red" })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(map);

    return () => map.remove();
  }, [userLocation]);

  // Step 3: Add markers + popup
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers and clear any open popup
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (openPopupRef.current) {
      try {
        openPopupRef.current.remove();
      } catch (e) {
        // ignore
      }
      openPopupRef.current = null;
    }

    jobs.forEach((job) => {
      const el = document.createElement("div");
      el.className =
        "w-4 h-4 bg-blue-600 rounded-full border-2 border-white cursor-pointer hover:scale-125 transition";

      // Popup container
      const popupNode = document.createElement("div");
      const root = createRoot(popupNode);
      root.render(
        <JobPopup
          job={job}
          onClose={() => {
            const popup = marker.getPopup();
            if (popup) {
              popup.remove();
              if (openPopupRef.current === popup) openPopupRef.current = null;
            }
          }}
          onViewDetails={() => onJobSelect(job)} // navigate only when clicking button
          isSaved={savedJobs.includes(job.id)}
          onSave={() => onSaveJob(job.id)}
        />
      );

      const popup = new mapboxgl.Popup({
        offset: 15,
        closeButton: false,
        closeOnClick: false,
      }).setDOMContent(popupNode);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([job.location.lng, job.location.lat])
        .setPopup(popup)
        .addTo(mapRef.current!);

      // Open popup on click — ensure only one popup is open at a time
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        if (openPopupRef.current && openPopupRef.current !== popup) {
          openPopupRef.current.remove();
        }
        popup.addTo(mapRef.current!);
        openPopupRef.current = popup;
      });

      markersRef.current.push(marker);
    });
  }, [jobs, savedJobs]);

  return (
    <div className="w-full h-[calc(100vh-73px)] relative rounded-lg overflow-hidden">
      {!userLocation && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
          Fetching your location...
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
