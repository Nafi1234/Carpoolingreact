import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setKilometer } from "../store/KilometerSlice";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sourceLongitude = useSelector(
    (state) => state.Pickup.pickuplocation.coordinates.longitude
  );
  const sourceLatitude = useSelector(
    (state) => state.Pickup.pickuplocation.coordinates.latitude
  );
  const destinationLongitude = useSelector(
    (state) => state.Pickup.dropofflocation.coordinates.longitude
  );
  const destinationLatitude = useSelector(
    (state) => state.Pickup.dropofflocation.coordinates.latitude
  );
  console.log("Directions Control:", directions);

  const metersToKilometers = (meters) => {
    return (meters / 1000).toFixed(2);
  };
  const minutesToHours = (minutes) => {
    return (minutes / 60).toFixed(2);
  };
  if (sourceLatitude == null) {
    navigate("/publish");
  }

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmFmaTc4OSIsImEiOiJjbG81ZTJ5M2cwN3RpMmtuenQ2ZHRkdWkyIn0.uLkKyNbf5FxAYBoAGi3eRg";
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [sourceLongitude, sourceLatitude],
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    map.addControl(directions, "top-left");

    setMap(map);
    setDirections(directions);
  }, [sourceLongitude, sourceLatitude]);

  useEffect(() => {
    if (
      directions &&
      !isNaN(sourceLongitude) &&
      !isNaN(sourceLatitude) &&
      !isNaN(destinationLongitude) &&
      !isNaN(destinationLatitude)
    ) {
      directions?.setOrigin([sourceLongitude, sourceLatitude]);
      directions?.setDestination([destinationLongitude, destinationLatitude]);
    }
  }, [
    directions,
    sourceLongitude,
    sourceLatitude,
    destinationLongitude,
    destinationLatitude,
  ]);

  useEffect(() => {
    if (directions) {
      directions.on("route", (e) => {
        const selected = e.route[0];
        setSelectedRoute(selected);
      });
    }
  }, [directions]);

  const buttonOnclick = () => {
    if (selectedRoute) {
      const kilometer = metersToKilometers(selectedRoute.distance);
      console.log("Here", kilometer);
      dispatch(setKilometer(kilometer));

      navigate("/pickup-date");
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        {selectedRoute && (
          <div>
            <p>
              <strong>Distance:</strong>{" "}
              {metersToKilometers(selectedRoute.distance)} kilometers
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {minutesToHours(selectedRoute.duration)} hours
            </p>
            <button
              onClick={buttonOnclick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        )}
      </div>
      <div className="w-1/2 h-screen" id="map-container"></div>
    </div>
  );
};

export default MapComponent;
