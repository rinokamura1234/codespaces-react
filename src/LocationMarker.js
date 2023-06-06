import React, { useState, useEffect, useRef } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function LocationMarker({ onPositionUpdate }) {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  const map = useMap();
  const circleRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);

        // Remove the previous circle layer 
        if (circleRef.current) {
          circleRef.current.remove();
        }

        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
        
        // Update the circle reference
        circleRef.current = circle;

        // Pass the updated position to the parent component
        onPositionUpdate(e.latlng);
      });
    };

    // Update the position initially
    updatePosition();

    // Update the position every 10 seconds
    const interval = setInterval(updatePosition, 10000);

    // Clear the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [map, onPositionUpdate]);

  const icon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/gps.png', // Path to the icon image
    iconSize: [38, 38], // Size of the icon
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}
export default LocationMarker;
