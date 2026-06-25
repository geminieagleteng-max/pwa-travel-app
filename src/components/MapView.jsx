import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ChevronLeft, ChevronRight, Clock, Navigation, Locate } from 'lucide-react';

// Fix default Leaflet icon paths in builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Haversine distance calculator in km
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Fetch routing geometry from OSRM
const getRoutePath = async (spots) => {
  let path = [];
  let totalDistance = 0; // in meters
  let totalDuration = 0; // in seconds

  if (spots.length < 2) return { path, distance: 0, duration: 0 };

  for (let i = 0; i < spots.length - 1; i++) {
    const start = spots[i];
    const end = spots[i + 1];
    const dist = getDistance(start.lat, start.lng, end.lat, end.lng);

    // If it's a long distance (e.g. flight across Taiwan Strait), use straight line fallback
    if (dist > 150) {
      path.push([start.lat, start.lng]);
      path.push([end.lat, end.lng]);
      totalDistance += dist * 1000;
      totalDuration += (dist / 800) * 3600; // 800 km/h flight
    } else {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        if (data.code === 'Ok' && data.routes && data.routes[0]) {
          const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
          path = path.concat(coords);
          totalDistance += data.routes[0].distance;
          totalDuration += data.routes[0].duration;
        } else {
          path.push([start.lat, start.lng]);
          path.push([end.lat, end.lng]);
          totalDistance += dist * 1000;
          totalDuration += (dist / 50) * 3600;
        }
      } catch (e) {
        path.push([start.lat, start.lng]);
        path.push([end.lat, end.lng]);
        totalDistance += dist * 1000;
        totalDuration += (dist / 50) * 3600;
      }
    }
  }
  return { path, distance: totalDistance, duration: totalDuration };
};

export default function MapView({ tripData, activeDay, setActiveDay }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const layerGroupRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);

  const [routeCoords, setRouteCoords] = useState([]);
  const [routeInfo, setRouteInfo] = useState({ distance: 0, duration: 0 });
  const [activeSpotIdx, setActiveSpotIdx] = useState(0);
  const [userLocation, setUserLocation] = useState(null);

  const dayData = tripData.days.find(d => d.dayNum === activeDay) || tripData.days[0];
  const validSpots = dayData.spots.filter(spot => spot.lat && spot.lng);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false
      }).setView([33.5900, 130.4010], 12);

      L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);

      layerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerGroupRef.current = null;
      }
    };
  }, []);

  // GPS User Localization Handler
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert('您的瀏覽器不支援 GPS 定位！');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 16, { animate: true });
        }
      },
      (error) => {
        console.error("GPS Error:", error);
        alert('無法取得定位資訊，請確認是否已開啟 GPS 權限。');
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  // Render User Location GPS Marker (Blue Pulsing Dot)
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    const gpsIcon = L.divIcon({
      className: 'gps-marker',
      html: `
        <div class="gps-dot"></div>
        <div class="gps-pulse"></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }

    userMarkerRef.current = L.marker(userLocation, { icon: gpsIcon })
      .bindPopup('<div style="font-family: var(--font-sans); font-size:12px; font-weight:bold; color:black;">您的目前位置</div>')
      .addTo(mapRef.current);

    return () => {
      if (userMarkerRef.current && mapRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current);
        userMarkerRef.current = null;
      }
    };
  }, [userLocation]);

  // Reset active spot index when day changes
  useEffect(() => {
    setActiveSpotIdx(0);
  }, [activeDay]);

  // Async Route Calculation Hook
  useEffect(() => {
    if (validSpots.length < 2) {
      setRouteCoords([]);
      setRouteInfo({ distance: 0, duration: 0 });
      return;
    }

    let isSubscribed = true;
    const calculateRoute = async () => {
      const result = await getRoutePath(validSpots);
      if (isSubscribed) {
        setRouteCoords(result.path);
        setRouteInfo({ distance: result.distance, duration: result.duration });
      }
    };

    calculateRoute();
    return () => {
      isSubscribed = false;
    };
  }, [activeDay, dayData.spots]);

  // Render Markers & Lines on the Map
  useEffect(() => {
    if (!mapRef.current || !layerGroupRef.current) return;

    layerGroupRef.current.clearLayers();
    markersRef.current = [];

    if (validSpots.length === 0) return;

    const coordinates = validSpots.map(s => [s.lat, s.lng]);

    // 1. Add Markers
    validSpots.forEach((spot, idx) => {
      const { lat, lng, name, time, desc } = spot;
      const marker = L.marker([lat, lng])
        .bindTooltip(`${idx + 1}. ${name}`, {
          permanent: true,
          direction: 'top',
          offset: [0, -12],
          className: 'custom-map-label'
        })
        .bindPopup(`
          <div style="font-family: var(--font-sans); min-width: 150px;">
            <strong style="color: var(--primary-light); display:block; margin-bottom: 2px;">
              [${time}] ${name}
            </strong>
            <span style="font-size: 11px; color: #cbd5e1;">${desc}</span>
            <div style="font-size: 9px; color: #94a3b8; margin-top:6px;">站點 ${idx + 1}</div>
          </div>
        `);
      
      marker.on('click', () => {
        setActiveSpotIdx(idx);
      });

      layerGroupRef.current.addLayer(marker);
      markersRef.current[idx] = marker;
    });

    // 2. Draw Polyline (snapped to roads or straight flight fallback)
    const lineToDraw = routeCoords.length > 0 ? routeCoords : coordinates;
    if (lineToDraw.length > 1) {
      const polyline = L.polyline(lineToDraw, {
        color: '#0ea5e9',
        weight: 4,
        opacity: 0.8,
        dashArray: '5, 8',
        lineJoin: 'round'
      });
      layerGroupRef.current.addLayer(polyline);
    }

    // 3. Fit Bounds
    try {
      const bounds = L.latLngBounds(coordinates);
      mapRef.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15,
        animate: true,
        duration: 1.0
      });
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);
    } catch (e) {
      console.error("Failed to fit bounds:", e);
    }

  }, [activeDay, dayData.spots, routeCoords]);

  // Helper function to focus on spot when clicking navigation UI
  const focusOnSpot = (idx) => {
    const spot = validSpots[idx];
    if (spot && mapRef.current && markersRef.current[idx]) {
      mapRef.current.setView([spot.lat, spot.lng], 15, { animate: true });
      markersRef.current[idx].openPopup();
    }
  };

  const handlePrevSpot = () => {
    const newIdx = Math.max(0, activeSpotIdx - 1);
    setActiveSpotIdx(newIdx);
    focusOnSpot(newIdx);
  };

  const handleNextSpot = () => {
    const newIdx = Math.min(validSpots.length - 1, activeSpotIdx + 1);
    setActiveSpotIdx(newIdx);
    focusOnSpot(newIdx);
  };

  const handleDotClick = (idx) => {
    setActiveSpotIdx(idx);
    focusOnSpot(idx);
  };

  const currentSpot = validSpots[activeSpotIdx];

  return (
    <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Horizontally scrollable day tabs */}
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '8px', 
        padding: '12px 16px',
        background: 'rgba(11, 15, 25, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 500
      }}>
        {tripData.days.map((day) => (
          <button
            key={day.dayNum}
            onClick={() => setActiveDay(day.dayNum)}
            style={{
              padding: '6px 12px',
              borderRadius: '15px',
              border: activeDay === day.dayNum ? '1px solid var(--secondary)' : '1px solid rgba(255,255,255,0.06)',
              background: activeDay === day.dayNum ? 'var(--secondary)' : 'rgba(255,255,255,0.04)',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Day {day.dayNum}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div style={{ flex: 1, position: 'relative', minHeight: '300px' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        
        {/* Floating Day Info Badge - Google Maps layout */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 400,
          background: 'rgba(22, 28, 45, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '10px 14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          maxWidth: '260px'
        }}>
          <h4 style={{ fontSize: '13px', margin: 0, color: 'white' }}>Day {dayData.dayNum} 行程路徑</h4>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', margin: '2px 0' }}>
            {dayData.title}
          </span>
          {routeInfo.distance > 0 && (
            <div style={{ 
              marginTop: '6px', 
              paddingTop: '6px', 
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: '10px',
              color: 'var(--secondary)',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Navigation size={10} />
              <span>
                全程約 {(routeInfo.distance / 1000).toFixed(1)} 公里 | 🚗 約 {Math.round(routeInfo.duration / 60)} 分鐘
              </span>
            </div>
          )}
        </div>

        {/* Floating GPS Button */}
        <button 
          onClick={handleLocateUser}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 400,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(22, 28, 45, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--secondary)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
          title="我的位置"
        >
          <Locate size={20} />
        </button>

        {/* Floating Navigation Card at Bottom (Google Maps style) */}
        {validSpots.length > 0 && currentSpot && (
          <div style={{
            position: 'absolute',
            bottom: '96px',
            left: '16px',
            right: '16px',
            zIndex: 400,
            pointerEvents: 'auto'
          }}>
            <div className="glass-card fade-in" style={{ 
              margin: 0, 
              padding: '14px',
              background: 'rgba(22, 28, 45, 0.9)',
              border: '1px solid var(--secondary)'
            }}>
              {/* Progress Dots Indicator */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '8px', 
                marginBottom: '10px' 
              }}>
                {validSpots.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleDotClick(idx)}
                    style={{
                      width: activeSpotIdx === idx ? '18px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: activeSpotIdx === idx ? 'var(--secondary)' : 'rgba(255,255,255,0.2)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    title={`第 ${idx + 1} 站`}
                  />
                ))}
              </div>

              {/* Navigation Controller */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button 
                  onClick={handlePrevSpot}
                  disabled={activeSpotIdx === 0}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: activeSpotIdx === 0 ? 'rgba(255,255,255,0.1)' : 'white',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s'
                  }}
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Spot Info Details Card */}
                <div 
                  onClick={() => focusOnSpot(activeSpotIdx)}
                  style={{ 
                    flex: 1, 
                    textAlign: 'center', 
                    padding: '0 8px', 
                    cursor: 'pointer',
                    userSelect: 'none' 
                  }}
                >
                  <span style={{ 
                    fontSize: '11px', 
                    color: 'var(--secondary)', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '2px'
                  }}>
                    <Clock size={10} /> 第 {activeSpotIdx + 1} / {validSpots.length} 站 • {currentSpot.time}
                  </span>
                  <strong style={{ 
                    fontSize: '15px', 
                    color: 'white', 
                    display: 'block', 
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {currentSpot.name}
                  </strong>
                  <p style={{ 
                    fontSize: '11px', 
                    color: 'var(--text-muted)', 
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '240px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    {currentSpot.desc}
                  </p>
                </div>

                <button 
                  onClick={handleNextSpot}
                  disabled={activeSpotIdx === validSpots.length - 1}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: activeSpotIdx === validSpots.length - 1 ? 'rgba(255,255,255,0.1)' : 'white',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s'
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
