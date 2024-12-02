'use client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
interface MapComponentProps {
    center: {
        lat: number;
        lng: number;
    };
}

const MapComponent = ({ center }: MapComponentProps) => {
    const mapStyles = {
        height: "100%",
        width: "100%",
    };

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;


// 'use client';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { useEffect } from 'react';

// // Fix for default marker icon
// const icon = L.icon({
//     iconUrl: '/marker-icon.png',  // Helyezd el ezt a képet a public mappában
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });

// interface MapComponentProps {
//     center: {
//         lat: number;
//         lng: number;
//     };
// }

// const MapComponent = ({ center }: MapComponentProps) => {
//     // Dynamic import for client-side only code
//     useEffect(() => {
//         // Fix for the missing icon issue
//         delete (L.Icon.Default.prototype as any)._getIconUrl;
//         L.Icon.Default.mergeOptions({
//             iconRetinaUrl: '/marker-icon-2x.png',
//             iconUrl: '/marker-icon.png',
//             shadowUrl: '/marker-shadow.png',
//         });
//     }, []);

//     return (
//         <div style={{ height: '400px', width: '100%' }}>
//             <MapContainer
//                 center={[center.lat, center.lng]}
//                 zoom={15}
//                 style={{ height: '100%', width: '100%' }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <Marker
//                     position={[center.lat, center.lng]}
//                     icon={icon}
//                 >
//                     <Popup>
//                         A pretty CSS3 popup. <br /> Easily customizable.
//                     </Popup>
//                 </Marker>
//             </MapContainer>
//         </div>
//     );
// };

// export default MapComponent;