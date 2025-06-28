import React, { useState, useRef } from "react";
import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import styles from "../../styles/Web/IntroFPT.module.css";

const containerStyle = {
  width: "70%",
  height: "400px",
  margin: "0 auto",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const fixedPosition = {
  lat: 10.841945693364616,
  lng: 106.80977528234146,
};

const mapOptions = {
  mapTypeId: "satellite",
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { brightness: 70 },
        { saturation: 100 },
        { contrast: 100 },
        { gamma: 0.1 },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ lightness: 75 }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "on" }, { lightness: 40 }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ visibility: "on" }, { lightness: 20 }],
    },
  ],
};

const GoogleMapComponent = () => {
  const [showInfo, setShowInfo] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const onMapLoad = (map) => {
    mapRef.current = map;
    if (!window.google || !window.google.maps || !window.google.maps.marker) {
      console.error("Google Maps API not loaded yet");
      return;
    }

    markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
      position: fixedPosition,
      map: map,
      title: "Trường Đại học FPT TP.HCM",
      content: document.createElement("div"),
    });

    markerRef.current.addListener("click", () => setShowInfo(!showInfo));
  };

  return (
    <div className="map-container">
      <h2
        className={`${styles.sourceSerif} text-5xl text-[#3d1085] font-bold text-center mt-4 mb-4`}>
        Our Location
      </h2>
      <div style={{ position: "relative" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={fixedPosition}
          zoom={17}
          options={mapOptions}
          onLoad={onMapLoad}>
          {showInfo && (
            <InfoWindow
              position={fixedPosition}
              onCloseClick={() => setShowInfo(false)}>
              <div>
                <h3
                  style={{
                    margin: "0 0 5px 0",
                    color: "#333",
                    fontWeight: "bold",
                  }}>
                  Trường Đại học FPT TP.HCM
                </h3>
                <p style={{ margin: "0", fontSize: "14px" }}>
                  7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh 700000, Vietnam
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <div style={{ textAlign: "center", margin: "20px auto", width: "70%" }}>
        <span className="text-xl font-thin text-purple-700 uppercase">
          Visit us at the address above or contact us at:{" "}
          <strong className="font-bold">0849 260 818</strong>
        </span>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
