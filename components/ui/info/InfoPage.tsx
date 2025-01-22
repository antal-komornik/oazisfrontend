
import React from 'react';
import {
    MapPin,
    Clock,
    Phone,
    // Mail,
    // Navigation
} from 'lucide-react';
import MapComponent from './MapConmponent';
// import MapComponent from './MapComponent';
const InfoPage = () => {
    const location = {
        lat: 46.958495385227316,
        lng: 18.940845639057216
    };
    return (
        <div className="container mx-auto  max-w-2xl">
            <div className=" rounded-lg shadow-lg p-4 mb-12">
                <h3 className="font-bold text-2xl mb-6  hidden md:block">OÁZIS ÉTTEREM</h3>
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Cím:</h4>
                    </div>

                    <div className="flex items-start gap-2">
                        {/* <Navigation className="w-4 h-4 text-base-content/60 mt-1" />  */}
                        <p>Dunaújváros, Építők útja 7/a, 2400</p>
                    </div>
                </div>

                <div className="w-full flex items-center bg-base-200 rounded-lg mb-6">
                    <MapComponent center={location} />
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Nyitvatartás:</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pl-7">
                        <span>Hétfő-Vasárnap:</span>
                        <span>11:00 - 21:00</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Kapcsolat:</h4>
                    </div>
                    <div className="space-y-2 pl-7">
                        <div className="flex items-center">
                            {/* {/ <Phone className="w-4 h-4 text-base-content/60" /> /} */}
                            <p>+36 30 758-0700</p>
                        </div>
                        {/* <div className="flex items-center gap-2">
              < Mail className="w-4 h-4 text-base-content/60" />
              <p>info@peldaetterem.hu</p>
            </div> */}
                    </div>
                </div>
            </div >
        </div >
    );
};
export default InfoPage;