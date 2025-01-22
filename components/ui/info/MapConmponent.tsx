// 'use client';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// interface MapComponentProps {
//     center: {
//         lat: number;
//         lng: number;
//     };
// }

// const MapComponent = ({ center }: MapComponentProps) => {
//     const mapStyles = {
//         height: "100%",
//         width: "100%",
//     };

//     return (
//         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
//             <GoogleMap
//                 mapContainerStyle={mapStyles}
//                 zoom={15}
//                 center={center}
//             >
//                 <Marker position={center} />
//             </GoogleMap>
//         </LoadScript>
//     );
// };

// export default MapComponent;


// // 'use client';
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import L from 'leaflet';
// // import { useEffect } from 'react';

// // // Fix for default marker icon
// // const icon = L.icon({
// //     iconUrl: '/marker-icon.png',  // Helyezd el ezt a képet a public mappában
// //     iconSize: [25, 41],
// //     iconAnchor: [12, 41],
// //     popupAnchor: [1, -34],
// //     shadowSize: [41, 41]
// // });

// // interface MapComponentProps {
// //     center: {
// //         lat: number;
// //         lng: number;
// //     };
// // }

// // const MapComponent = ({ center }: MapComponentProps) => {
// //     // Dynamic import for client-side only code
// //     useEffect(() => {
// //         // Fix for the missing icon issue
// //         delete (L.Icon.Default.prototype as any)._getIconUrl;
// //         L.Icon.Default.mergeOptions({
// //             iconRetinaUrl: '/marker-icon-2x.png',
// //             iconUrl: '/marker-icon.png',
// //             shadowUrl: '/marker-shadow.png',
// //         });
// //     }, []);

// //     return (
// //         <div style={{ height: '400px', width: '100%' }}>
// //             <MapContainer
// //                 center={[center.lat, center.lng]}
// //                 zoom={15}
// //                 style={{ height: '100%', width: '100%' }}
// //             >
// //                 <TileLayer
// //                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //                 />
// //                 <Marker
// //                     position={[center.lat, center.lng]}
// //                     icon={icon}
// //                 >
// //                     <Popup>
// //                         A pretty CSS3 popup. <br /> Easily customizable.
// //                     </Popup>
// //                 </Marker>
// //             </MapContainer>
// //         </div>
// //     );
// // };

// // export default MapComponent;

'use client';
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapComponentProps {
    center: {
        lat: number;
        lng: number;
    };
}

const containerStyle = {
    width: '800px',
    height: '400px',
}

type MapType = google.maps.Map;

const MapComponent = ({ center }: MapComponentProps) => {
    const [, setMap] = useState<MapType | null>(null);

    const { isLoaded, loadError } = useJsApiLoader({
        // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        googleMapsApiKey: 'AIzaSyBvYHHelT_7rxveJl4jZAGWdZFf6OOHVzE',
        version: "oazis"
    });

    // const mapStyles: google.maps.MapOptions['fullscreenControl'] = true

    const onLoad = useCallback((map: MapType) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    if (loadError) {
        return <div className="w-full h-full flex items-center justify-center">
            Hiba történt a térkép betöltésekor
        </div>;
    }

    if (!isLoaded) {
        return <div className="w-full h-full flex items-center justify-center">
            Betöltés...
        </div>;
    }

    return (
        <GoogleMap
            // mapContainerStyle={mapStyles}
            mapContainerStyle={containerStyle}
            zoom={15}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            }}
        >
            {center && <Marker position={center} />}
        </GoogleMap>
    );
};

export default MapComponent;