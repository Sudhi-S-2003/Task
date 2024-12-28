"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CustomMap = () => {
    const [position, setPosition] = useState([8.5241, 76.9366]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [popupContent, setPopupContent] = useState("Thiruvananthapuram, Kerala, India");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition([latitude, longitude]);
                    getLocationName(latitude, longitude);
                },
                (error) => {
                    let message = "Error getting location";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            message = "User denied the request for Geolocation.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            message = "The request to get user location timed out.";
                            break;
                        default:
                            message = "An unknown error occurred.";
                            break;
                    }
                    setErrorMessage(message);
                }
            );
        } else {
            setErrorMessage("Geolocation is not supported by this browser.");
        }
    }, []);

    const customIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const getLocationName = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            const address = data?.address;
            const city = address?.city || address?.town || address?.village || "Unknown City";
            const state = address?.state || "Unknown State";
            const country = address?.country || "Unknown Country";
            const locationName = `${city}, ${state}, ${country}`;
            setPopupContent(locationName);
        } catch (error) {
            setPopupContent("Location not found");
        }
    };

    const handleDragEnd = async (event) => {
        const { lat, lng } = event.target.getLatLng();
        setPosition([lat, lng]);

        await getLocationName(lat, lng);
    };

    const handleCloseErrorMessage = () => {
        setErrorMessage(null);
    };

    return (
        <div>
            {errorMessage && (
                <div className="text-red-600 text-center bg-slate-200 p-4 rounded-md shadow-md flex justify-center items-center ">
                    <span className="flex-1 text-left">{errorMessage}</span>
                    <span
                        onClick={handleCloseErrorMessage}
                        className="cursor-pointer text-3xl font-semibold text-red-700 hover:text-red-900 transition duration-200 ease-in-out transform hover:scale-110"
                    >
                        &times;
                    </span>
                </div>


            )}
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "400px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={position}
                    icon={customIcon}
                    draggable={true}
                    eventHandlers={{
                        dragend: handleDragEnd,
                    }}
                >
                    <Popup>
                        {popupContent}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default CustomMap;
