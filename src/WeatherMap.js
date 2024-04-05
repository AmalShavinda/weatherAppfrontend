import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconPng,
  iconUrl: markerIconPng,
  shadowUrl: markerIconShadow,
});

const WeatherMap = () => {
  const [weather, setWeather] = useState([]);

  const isValidCoordinate = (coord) => {
    const num = parseFloat(coord);
    return !isNaN(num) && isFinite(num);
  };

  const isValidLatLng = (lat, lng) => {
    return (
      isValidCoordinate(lat) &&
      isValidCoordinate(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  };

  const fetchWeatherData = async () => {
  
      try {
        const response = await fetch("http://localhost:5000/weather");
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); 

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {weather
        .filter((station) => isValidLatLng(station.latitude, station.longitude))
        .map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
          >
            <Popup>
              District: {station.district}
              <br />
              Temperature: {station.temperature}
              <br />
              Humidity: {station.humidity}
              <br />
              Air Pressure: {station.airPressure}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default WeatherMap;
