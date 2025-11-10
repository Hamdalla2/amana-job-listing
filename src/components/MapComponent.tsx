import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Job } from "../types";
import { JobPopup } from "./JobPopup";
import { createRoot } from "react-dom/client";
import type { Root as ReactRoot } from "react-dom/client";

interface MapComponentProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  savedJobs: string[];
  onSaveJob: (jobId: string) => void;
}

export function MapComponent({
  jobs,
  onJobSelect,
  savedJobs,
  onSaveJob,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const markersRef = useRef<Array<{ marker: L.Marker; root: ReactRoot }>>([]);
  const openPopupRef = useRef<L.Popup | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [locationSource, setLocationSource] = useState<
    "gps" | "fallback" | null
  >(null);
  // Helper: request geolocation (can be called from UI to retry)
  const requestGeolocation = () => {
    const FALLBACK: [number, number] = [35.2034, 31.9058]; // Ramallah [lon, lat]

    const success = (pos: GeolocationPosition) => {
      console.log("Geolocation success:", pos);
      setUserLocation([pos.coords.longitude, pos.coords.latitude]);
      setLocationSource("gps");
    };

    const error = (err: GeolocationPositionError | any) => {
      console.warn("Geolocation failed or denied:", err);
      setUserLocation(FALLBACK);
      setLocationSource("fallback");
    };

    if (!navigator.geolocation) {
      error(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  };

  // Step 1: Get user location (use Permissions API when available, fallback to Ramallah)
  useEffect(() => {
    // If Permissions API available, check status first to avoid re-prompting when denied
    if (
      (navigator as any).permissions &&
      (navigator as any).permissions.query
    ) {
      try {
        (navigator as any).permissions
          .query({ name: "geolocation" })
          .then((status: any) => {
            if (status.state === "denied") {
              // Immediately use fallback
              setUserLocation([35.2034, 31.9058]);
              setLocationSource("fallback");
            } else {
              // state === 'granted' or 'prompt'
              requestGeolocation();
            }
          })
          .catch(() => {
            // If query fails for any reason, try to get position (will prompt)
            requestGeolocation();
          });
      } catch (e) {
        requestGeolocation();
      }
    } else {
      requestGeolocation();
    }
  }, []);

  // Step 2: Initialize map once
  useEffect(() => {
    if (!userLocation) return;

    const latLng: [number, number] = [userLocation[1], userLocation[0]]; // [lat, lng]

    // If map not initialized yet, create it and add tile layer + marker
    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current as HTMLDivElement, {
        center: latLng,
        zoom: 12,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;

      userMarkerRef.current = L.marker(latLng, { interactive: false })
        .addTo(map)
        .bindPopup("You are here");
    } else {
      // Map exists: update view and user marker position
      try {
        mapRef.current.setView(latLng, mapRef.current.getZoom());
      } catch (e) {
        // ignore
      }

      if (userMarkerRef.current) {
        try {
          userMarkerRef.current.setLatLng(latLng);
        } catch (e) {
          // ignore
        }
      } else {
        try {
          userMarkerRef.current = L.marker(latLng, { interactive: false })
            .addTo(mapRef.current)
            .bindPopup("You are here");
        } catch (e) {
          // ignore
        }
      }
    }
  }, [userLocation]);

  useEffect(() => {
    return () => {
      // only remove map when component unmounts — keep mapRef removal when mapRef exists and component unmounts
      if (
        mapRef.current &&
        !document.body.contains(mapContainerRef.current as Node)
      ) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Step 3: Add markers + popup
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers and clear any open popup
    markersRef.current.forEach(({ marker, root }) => {
      try {
        marker.remove();
      } catch (e) {
        // ignore
      }
      try {
        root.unmount();
      } catch (e) {
        // ignore
      }
    });
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
          onViewDetails={() => onJobSelect(job)}
          isSaved={savedJobs.includes(job.id)}
          onSave={() => onSaveJob(job.id)}
        />
      );

      const popup = L.popup({
        // use a PointExpression instead of a number
        offset: L.point(0, -15),
        closeButton: false,
        autoClose: false,
        closeOnClick: false,
      }).setContent(popupNode);

      const icon = L.divIcon({
        className: el.className,
        html: "",
        iconSize: [16, 16],
      });

      const marker = L.marker([job.location.lat, job.location.lng], {
        icon,
      }).addTo(mapRef.current as L.Map);

      marker.bindPopup(popup);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        if (openPopupRef.current && openPopupRef.current !== popup) {
          try {
            openPopupRef.current.remove();
          } catch (e) {
            // ignore
          }
        }
        marker.openPopup();
        openPopupRef.current = popup;
      });

      // Also open popup when marker itself is clicked (for accessibility)
      marker.on("click", (ev) => {
        ev.originalEvent?.stopPropagation();
        if (openPopupRef.current && openPopupRef.current !== popup) {
          try {
            openPopupRef.current.remove();
          } catch (e) {
            // ignore
          }
        }
        marker.openPopup();
        openPopupRef.current = popup;
      });

      markersRef.current.push({ marker, root });
    });
  }, [jobs, savedJobs]);

  return (
    <div className="w-full h-[calc(100vh-73px)] relative rounded-lg overflow-hidden">
      {!userLocation && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
          Fetching your location...
        </div>
      )}
      {locationSource === "fallback" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-100 px-3 py-2 rounded-md shadow">
          Using Ramallah as a fallback because location access was denied.
          <button
            className="ml-3 underline text-sm"
            onClick={() => requestGeolocation()}
          >
            Retry
          </button>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
