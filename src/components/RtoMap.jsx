import { useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from '../App';
import { MapPin, Navigation, Compass, Layers, CheckCircle } from 'lucide-react';

const RTO_TRACKS = [
  {
    id: 'gj01',
    name: 'Ahmedabad RTO (Subhash Bridge)',
    state: 'Gujarat',
    city: 'Ahmedabad',
    lat: 23.0645,
    lng: 72.5804,
    type: 'Automated Sensor Track (Sensor-based 8 & Parking)',
    timings: '09:30 AM - 05:00 PM',
    slotsPerDay: 240
  },
  {
    id: 'gj27',
    name: 'Ahmedabad East RTO (Vastral)',
    state: 'Gujarat',
    city: 'Ahmedabad',
    lat: 22.9984,
    lng: 72.6515,
    type: 'Automated Camera Track (Overhead AI Evaluation)',
    timings: '10:00 AM - 04:30 PM',
    slotsPerDay: 180
  },
  {
    id: 'gj18',
    name: 'Gandhinagar RTO (Sector 28)',
    state: 'Gujarat',
    city: 'Gandhinagar',
    lat: 23.2505,
    lng: 72.6644,
    type: 'Digital Track 8 & Hill Gradient Ramp',
    timings: '10:00 AM - 05:00 PM',
    slotsPerDay: 160
  },
  {
    id: 'dl01',
    name: 'Delhi Sarai Kale Khan ADTT',
    state: 'Delhi',
    city: 'New Delhi',
    lat: 28.5882,
    lng: 77.2539,
    type: 'Maruti-NIC Automated Driving Test Track',
    timings: '08:30 AM - 04:00 PM',
    slotsPerDay: 300
  },
  {
    id: 'ka05',
    name: 'Bengaluru South RTO (Jayanagar Track)',
    state: 'Karnataka',
    city: 'Bengaluru',
    lat: 12.9299,
    lng: 77.5824,
    type: 'Electronic Track (RFID & Ground Sensors)',
    timings: '10:00 AM - 05:30 PM',
    slotsPerDay: 220
  }
];

export default function RtoMap() {
  const { lang, effectiveTheme } = useContext(AppContext);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedCenter, setSelectedCenter] = useState(RTO_TRACKS[0]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Inject Leaflet CSS if not already present
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Inject Leaflet JS if not already loaded
    if (!window.L) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current || !window.L) return;

      const L = window.L;
      const initial = RTO_TRACKS[0];

      const map = L.map(mapContainerRef.current, {
        center: [initial.lat, initial.lng],
        zoom: 12,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Custom Pin Marker
      const customPin = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color:#2563eb;width:24px;height:24px;border:3px solid #ffffff;border-radius:50%;box-shadow:0 0 10px rgba(37,99,235,0.8);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      // Add RTO Track Markers
      RTO_TRACKS.forEach((track) => {
        const marker = L.marker([track.lat, track.lng], { icon: customPin }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:sans-serif;padding:4px;color:#0f172a;">
            <b style="font-size:13px;color:#1e40af;">${track.name}</b>
            <p style="font-size:11px;margin:3px 0 0;color:#475569;">${track.type}</p>
            <p style="font-size:10px;margin:2px 0 0;color:#059669;font-weight:bold;">Slots: ~${track.slotsPerDay} per day</p>
          </div>
        `);
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSelectTrack = (track) => {
    setSelectedCenter(track);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([track.lat, track.lng], 14, { duration: 1.2 });
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Compass size={14} />
            <span>OpenStreetMap & Leaflet Integration</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {lang === 'en' ? 'Automated Driving Test Track (ADTT) Locator' : lang === 'hi' ? 'स्वचालित ड्राइविंग टेस्ट ट्रैक लोकेटर' : 'ઓટોમેટેડ ડ્રાઇવિંગ ટેસ્ટ ટ્રેક લોકેટર'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'en' 
              ? 'Find official camera and sensor-equipped RTO testing tracks across major cities.' 
              : 'ઓપનસ્ટ્રીટમેપ દ્વારા સત્તાવાર RTO ટેસ્ટિંગ ટ્રેક શોધો.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
          <Layers size={14} className="text-emerald-400" />
          <span>OpenStreetMap Tiles (Zero API Key)</span>
        </div>
      </div>

      {/* City Switcher Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {RTO_TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelectTrack(t)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCenter.id === t.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <MapPin size={13} />
            <span>{t.city} ({t.id.toUpperCase()})</span>
          </button>
        ))}
      </div>

      {/* Map Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-inner h-72 sm:h-80 w-full z-0 bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Selected Track Details Card */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{selectedCenter.name}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              ✓ ADTT Certified
            </span>
          </div>
          <p className="text-xs text-slate-400">{selectedCenter.type}</p>
          <p className="text-[11px] text-slate-500">Operating hours: {selectedCenter.timings} • Daily test capacity: ~{selectedCenter.slotsPerDay} applicants</p>
        </div>

        <a
          href={`https://www.openstreetmap.org/?mlat=${selectedCenter.lat}&mlon=${selectedCenter.lng}#map=16/${selectedCenter.lat}/${selectedCenter.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold transition shrink-0"
        >
          <Navigation size={13} />
          <span>Open Full Navigation</span>
        </a>
      </div>
    </div>
  );
}