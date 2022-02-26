import { useEffect, useState } from "react";

interface UseCoordState {
  latitude: number | null;
  longitude: number | null;
}

const useCoords = () => {
  const [coords, setCoords] = useState<UseCoordState>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: // eslint-disable-next-line no-undef
  GeolocationPosition) => {
    setCoords({
      latitude,
      longitude,
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
};

export default useCoords;
