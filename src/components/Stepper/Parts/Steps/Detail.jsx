import { useStepperContext } from "../../context/StepperContext";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
export default function Details() {
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

  return (
    <div className="flex flex-col ">
      <div className=" w-full mx-2 flex-1">
        <div className="h-screen" id="map-container"></div>
      </div>
    </div>
  );
}
