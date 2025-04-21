import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "../../Error.jsx";
import {sortPlacesByDistance} from '../loc.js'
import { fetchAvailablePlaces } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
     const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })
      } catch (error) {
        setError({ message: error.message || "Something went wrong!" });
        setIsFetching(false);
      }

      
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An Error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Loading available places..."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
