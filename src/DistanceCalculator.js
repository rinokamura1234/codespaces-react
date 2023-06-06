import { Margin } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib';

function DistanceCalculator({ userPosition, targetPosition }) {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (userPosition && targetPosition) {
      const calculateDistance = () => {
        const userCoords = {
          latitude: userPosition[0],
          longitude: userPosition[1],
        };

        const targetCoords = {
          latitude: targetPosition[0],
          longitude: targetPosition[1],
        };

        const distanceInMeters = getDistance(userCoords, targetCoords);
        const distanceInKilometers = distanceInMeters / 1000;

        setDistance(distanceInKilometers.toFixed(2));
      };

      calculateDistance();
    }
  }, [userPosition, targetPosition]);

  return (
    <p 
      style={{marginBottom: '0rem', marginTop: '0rem'}}
    >
      Distance: {distance} km
    </p>
  );
}
export default DistanceCalculator;