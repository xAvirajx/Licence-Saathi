import { useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
  MapPin, Navigation, Compass, Layers, CheckCircle, 
  Car, Bike, Filter, Wrench, ShieldCheck, Clock, IndianRupee
} from 'lucide-react';

const ALL_TRACKS = [
  // --- 1. OFFICIAL RTO EXAM TEST TRACKS (ADTT) ---
  {
    id: 'gj01',
    category: 'official', // 'official' | 'practice'
    vehicleType: 'both',  // 'car' | 'bike' | 'both'
    name: 'Ahmedabad RTO (Subhash Bridge ADTT)',
    state: 'Gujarat',
    city: 'Ahmedabad',
    lat: 23.0645,
    lng: 72.5804,
    type: 'Official Sensor ADTT (Overhead AI & Ground Sensors)',
    timings: '09:30 AM - 05:00 PM (Slot Only)',
    fee: 'Official ₹200 LL / ₹300 DL Exam Fee',
    practiceAllowed: false,
    elements: ['Sensor Figure-8', 'The H-Track', 'Gradient Ramp', 'Parallel Parking'],
    note: 'Official exam center only. No unauthorized private practice allowed on track.'
  },
  {
    id: 'gj27',
    category: 'official',
    vehicleType: 'both',
    name: 'Ahmedabad East RTO (Vastral ADTT)',
    state: 'Gujarat',
    city: 'Ahmedabad',
    lat: 22.9984,
    lng: 72.6515,
    type: 'Official Digital Camera Track',
    timings: '10:00 AM - 04:30 PM (Slot Only)',
    fee: 'Official Govt Slot Fee',
    practiceAllowed: false,
    elements: ['Sensor Figure-8', 'Reverse S-Bend', 'Hill Gradient'],
    note: 'Active automated evaluation zone. Arrive 30 mins before scheduled batch.'
  },
  {
    id: 'gj18',
    category: 'official',
    vehicleType: 'both',
    name: 'Gandhinagar RTO (Sector 28 ADTT)',
    state: 'Gujarat',
    city: 'Gandhinagar',
    lat: 23.2505,
    lng: 72.6644,
    type: 'Official Automated Driving Testing Track',
    timings: '10:00 AM - 05:00 PM',
    fee: 'Official Govt Slot Fee',
    practiceAllowed: false,
    elements: ['Digital Figure-8', 'The H-Track', '1:6 Hill Ramp'],
    note: 'Official testing center for Gandhinagar and surrounding zones.'
  },
  {
    id: 'dl01',
    category: 'official',
    vehicleType: 'both',
    name: 'Delhi Sarai Kale Khan ADTT',
    state: 'Delhi',
    city: 'New Delhi',
    lat: 28.5882,
    lng: 77.2539,
    type: 'Maruti-NIC Automated Track',
    timings: '08:30 AM - 04:00 PM',
    fee: 'Official Govt Slot Fee',
    practiceAllowed: false,
    elements: ['Figure-8 Sensor Loop', 'Parallel Bay', 'Overhead AI Gantry'],
    note: 'Automated video analytics track managed by Delhi Transport Dept.'
  },
  {
    id: 'ka05',
    category: 'official',
    vehicleType: 'both',
    name: 'Bengaluru South RTO (Jayanagar Track)',
    state: 'Karnataka',
    city: 'Bengaluru',
    lat: 12.9299,
    lng: 77.5824,
    type: 'Electronic Track (RFID & Ground Coils)',
    timings: '10:00 AM - 05:30 PM',
    fee: 'Official Govt Slot Fee',
    practiceAllowed: false,
    elements: ['Figure-8 Track', 'H-Track', 'Gradient Incline'],
    note: 'Electronic sensor evaluation for southern Bengaluru zone.'
  },

  // --- 2. AUTHORIZED & PUBLIC PRE-EXAM PRACTICE TRACKS ---
  {
    id: 'prac-ahmd-01',
    category: 'practice',
    vehicleType: 'both',
    name: 'IDTR Sarkhej Mock RTO Practice Ground',
    state: 'Gujarat',
    city: 'Ahmedabad',
    lat: 22.9841,
    lng: 72.5032,
    type: 'Authorized Pre-Exam Mock Training Ground',
    timings: '07:00 AM - 07:00 PM (Daily)',
    fee: '₹150 - ₹250 / hour (Or bring own vehicle)',
    practiceAllowed: true,
    elements: ['1:1 Replica Figure-8', 'Complete H-Track', 'Hill Gradient Ramp', 'Dual Controls Available'],
    note: 'Open for public rehearsal. You can bring your own 2-wheeler or car to practice with trainers.'
  },
  {
    id: 'prac-ahmd-02',
    category: 'practice',
    vehicleType: 'car',
    name: 'Nikol LMV Mock H-Track & Parking Bay',
    state: 'Gujarat',
    city: 'Ahmedabad',
    lat: 23.0487,
    lng: 72.6719,
    type: 'Dedicated Car Maneuver Practice Track',
    timings: '06:30 AM - 08:30 PM',
    fee: '₹200 / session (Includes instructor guidance)',
    practiceAllowed: true,
    elements: ['Exact H-Track with Poles', 'Parallel Parking Box', 'Reverse S-Bend'],
    note: 'Designed specifically for candidates struggling with car reverse parking and H-turn sensor borders.'
  },
  {
    id: 'prac-gandhi-01',
    category: 'practice',
    vehicleType: 'both',
    name: 'Sector 11 Open Driving Practice Ground',
    state: 'Gujarat',
    city: 'Gandhinagar',
    lat: 23.2185,
    lng: 72.6398,
    type: 'Public Civic Practice Ground (Free Entry)',
    timings: 'Open 24 Hours (Best during daylight)',
    fee: 'Free Public Access (Bring own vehicle)',
    practiceAllowed: true,
    elements: ['Paved Figure-8 Surface', 'Slope Incline Berm', 'Wide Open Turning Area'],
    note: 'Free open ground maintained for local learner practice. Marked asphalt figure-8 for two-wheelers.'
  },
  {
    id: 'prac-delhi-01',
    category: 'practice',
    vehicleType: 'both',
    name: 'Loni Road IDTR Mock Driving Practice Facility',
    state: 'Delhi',
    city: 'New Delhi',
    lat: 28.6948,
    lng: 77.2912,
    type: 'Government-Certified Practice Track',
    timings: '08:00 AM - 06:00 PM',
    fee: '₹180 / hour',
    practiceAllowed: true,
    elements: ['Automated Gantry Simulation', 'Full H-Track', 'Figure-8', 'Ramp Hill Stop'],
    note: 'Offers mock exam trials with sensor buzzers to simulate real Delhi ADTT test conditions.'
  },
  {
    id: 'prac-beng-01',
    category: 'practice',
    vehicleType: 'both',
    name: 'Kanteerava Outer Ring Mock Track Facility',
    state: 'Karnataka',
    city: 'Bengaluru',
    lat: 12.9698,
    lng: 77.5926,
    type: 'Motor Training Association Practice Track',
    timings: '06:00 AM - 07:00 PM',
    fee: '₹200 / hour',
    practiceAllowed: true,
    elements: ['Two-Wheeler Balance Planks', 'Figure-8', 'Parallel Reverse Box'],
    note: 'Features elevated narrow balance beams and Figure-8 layouts to practice zero-foot-touchdowns.'
  }
];

export default function RtoMap() {
  const { lang, effectiveTheme } = useContext(AppContext);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Filters State
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'official' | 'practice'
  const [vehicleFilter, setVehicleFilter] = useState('all');   // 'all' | 'car' | 'bike'
  const [selectedCity, setSelectedCity] = useState('all');

  // Filtered List
  const filteredTracks = ALL_TRACKS.filter(t => {
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    const matchesVehicle = vehicleFilter === 'all' || t.vehicleType === 'both' || t.vehicleType === vehicleFilter;
    const matchesCity = selectedCity === 'all' || t.city === selectedCity;
    return matchesCategory && matchesVehicle && matchesCity;
  });

  const [selectedTrack, setSelectedTrack] = useState(ALL_TRACKS[0]);

  // Unique Cities for Switcher
  const cities = ['all', ...new Set(ALL_TRACKS.map(t => t.city))];

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
      const initial = ALL_TRACKS[0];

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

      // FeatureGroup layer to manage marker refreshes
      markersLayerRef.current = L.featureGroup().addTo(map);
      mapInstanceRef.current = map;

      renderMarkers();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Re-render markers whenever filters change
  useEffect(() => {
    if (mapInstanceRef.current && window.L && markersLayerRef.current) {
      renderMarkers();
    }
  }, [categoryFilter, vehicleFilter, selectedCity]);

  const renderMarkers = () => {
    const L = window.L;
    if (!L || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredTracks.forEach((track) => {
      const isPractice = track.category === 'practice';
      
      // Blue Pin for Official ADTT Exam Centers, Emerald Pin for Practice Grounds
      const pinColor = isPractice ? '#10b981' : '#2563eb';
      const pinBorder = '#ffffff';
      const labelText = isPractice ? 'P' : 'RTO';

      const customPin = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${pinColor};
            width: 28px;
            height: 28px;
            border: 2.5px solid ${pinBorder};
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 900;
            color: #ffffff;
            font-family: sans-serif;
          ">
            ${labelText}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([track.lat, track.lng], { icon: customPin });
      marker.on('click', () => {
        setSelectedTrack(track);
      });

      marker.bindPopup(`
        <div style="font-family:sans-serif;padding:3px;color:#0f172a;min-width:180px;">
          <div style="display:inline-block;padding:2px 6px;border-radius:6px;font-size:9px;font-weight:bold;margin-bottom:4px;color:#ffffff;background-color:${isPractice ? '#059669' : '#1d4ed8'};">
            ${isPractice ? '✓ PRE-EXAM PRACTICE TRACK' : '★ OFFICIAL EXAM ADTT'}
          </div>
          <b style="font-size:12px;display:block;color:#0f172a;line-height:1.2;">${track.name}</b>
          <p style="font-size:11px;margin:3px 0 0;color:#475569;">${track.type}</p>
          <p style="font-size:10px;margin:3px 0 0;color:${isPractice ? '#059669' : '#2563eb'};font-weight:bold;">${track.fee}</p>
        </div>
      `);

      markersLayerRef.current.addLayer(marker);
    });

    if (filteredTracks.length > 0 && mapInstanceRef.current) {
      // Center map to first matching item
      const first = filteredTracks[0];
      setSelectedTrack(first);
      mapInstanceRef.current.flyTo([first.lat, first.lng], 12, { duration: 0.8 });
    }
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([track.lat, track.lng], 14, { duration: 1.0 });
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      
      {/* 1. Header with Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Compass size={14} />
            <span>Interactive OpenStreetMap & Leaflet Map</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {lang === 'en' 
              ? 'RTO Exam ADTT & Open Practice Tracks' 
              : lang === 'hi' 
              ? 'आरटीओ टेस्ट ट्रैक और पूर्व-अभ्यास केंद्र' 
              : 'RTO ટેસ્ટ ટ્રેક અને પ્રેક્ટિસ ગ્રાઉન્ડ લોકેટર'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'en' 
              ? 'Find official exam tracks alongside public mock grounds where you can take your car or bike to rehearse.' 
              : 'પરીક્ષા આપતા પહેલા ગાડી કે બાઇકની પ્રેક્ટિસ કરવા માટેના સત્તાવાર ટ્રેક અને મોક ગ્રાઉન્ડ્સ.'}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-slate-950 p-2.5 rounded-2xl border border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 border border-white"></span>
            <span className="text-slate-300 font-bold text-[11px]">Official Exam (ADTT)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
            <span className="text-emerald-400 font-bold text-[11px]">Open Practice Track</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Filters: Track Purpose & Vehicle Class */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Track Category Filter (Exam vs Practice) */}
        <div className="p-1 bg-slate-950 rounded-2xl border border-slate-800 flex items-center">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              categoryFilter === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Tracks ({ALL_TRACKS.length})
          </button>
          <button
            onClick={() => setCategoryFilter('official')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              categoryFilter === 'official' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Exam Centers
          </button>
          <button
            onClick={() => setCategoryFilter('practice')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              categoryFilter === 'practice' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Practice Grounds
          </button>
        </div>

        {/* Vehicle Filter */}
        <div className="p-1 bg-slate-950 rounded-2xl border border-slate-800 flex items-center">
          <button
            onClick={() => setVehicleFilter('all')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              vehicleFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Vehicles
          </button>
          <button
            onClick={() => setVehicleFilter('car')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
              vehicleFilter === 'car' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car size={13} />
            <span>Cars (LMV)</span>
          </button>
          <button
            onClick={() => setVehicleFilter('bike')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
              vehicleFilter === 'bike' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bike size={13} />
            <span>Bikes (MCWG)</span>
          </button>
        </div>

        {/* City Filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar items-center">
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCity === c
                  ? 'bg-blue-950/60 border-blue-500 text-blue-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c === 'all' ? 'All Cities' : c}
            </button>
          ))}
        </div>

      </div>

      {/* 3. The Interactive Leaflet Map Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-inner h-80 sm:h-96 w-full z-0 bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* 4. Active Selected Track Inspection Card */}
      {selectedTrack && (
        <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          selectedTrack.category === 'practice'
            ? 'bg-emerald-950/20 border-emerald-600/40'
            : 'bg-blue-950/20 border-blue-600/40'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  selectedTrack.category === 'practice'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : 'bg-blue-950 text-blue-300 border-blue-700'
                }`}>
                  {selectedTrack.category === 'practice' ? '✓ Practice Ground (Pre-Exam)' : '★ Official Exam Track'}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                  {selectedTrack.city}, {selectedTrack.state}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center gap-1">
                  {selectedTrack.vehicleType === 'car' ? <Car size={11} /> : selectedTrack.vehicleType === 'bike' ? <Bike size={11} /> : 'Car & Bike'}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-white">{selectedTrack.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{selectedTrack.type}</p>
            </div>

            <a
              href={`https://www.openstreetmap.org/?mlat=${selectedTrack.lat}&mlon=${selectedTrack.lng}#map=16/${selectedTrack.lat}/${selectedTrack.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 shrink-0"
            >
              <Navigation size={14} />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Operational Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-slate-300">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <Clock size={12} className="text-blue-400" />
                <span>Operating Timings</span>
              </span>
              <p className="font-semibold text-white">{selectedTrack.timings}</p>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <IndianRupee size={12} className="text-emerald-400" />
                <span>Fee & Access Terms</span>
              </span>
              <p className="font-semibold text-emerald-400">{selectedTrack.fee}</p>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <Wrench size={12} className="text-amber-400" />
                <span>Practice Access</span>
              </span>
              <p className={`font-semibold ${selectedTrack.practiceAllowed ? 'text-emerald-300' : 'text-amber-300'}`}>
                {selectedTrack.practiceAllowed ? 'Open for Personal Rehearsal' : 'Strictly Exam Slot Only'}
              </p>
            </div>
          </div>

          {/* Available Maneuver Elements on this Track */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-1">Available Track Setups:</span>
            {selectedTrack.elements.map((el, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-medium text-slate-200">
                • {el}
              </span>
            ))}
          </div>

          {/* Operational Advisory Note */}
          <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400">
            <strong>Advisory:</strong> {selectedTrack.note}
          </div>
        </div>
      )}

      {/* 5. Quick Track Selector Carousel */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Showing {filteredTracks.length} Matching Tracks (Click to Focus Map):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredTracks.map(t => {
            const isSelected = selectedTrack?.id === t.id;
            const isPractice = t.category === 'practice';

            return (
              <button
                key={t.id}
                onClick={() => handleSelectTrack(t)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? isPractice
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/50'
                      : 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isPractice ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-blue-950 text-blue-400 border border-blue-800'
                  }`}>
                    {isPractice ? 'Practice' : 'Official ADTT'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">{t.city}</span>
                </div>
                <p className="text-xs font-bold text-white truncate">{t.name}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.fee}</p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}