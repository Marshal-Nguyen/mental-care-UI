import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "../../styles/Web/IntroFPT.module.css";

// Thiết lập style cho container bản đồ
const containerStyle = {
  width: "70%", // Chiếm 70% chiều dài màn hình
  height: "400px",
  margin: "0 auto", // Căn giữa bản đồ
  borderRadius: "8px", // Bo tròn góc
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Thêm đổ bóng
};

// Vị trí cố định
const fixedPosition = {
  lat: 10.841945693364616,
  lng: 106.80977528234146,
};

// Tùy chọn bản đồ với kiểu vệ tinh được điều chỉnh để sáng hơn
const mapOptions = {
  mapTypeId: "satellite", // Thiết lập kiểu bản đồ vệ tinh
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  // Điều chỉnh độ sáng và độ tương phản để có hình ảnh sáng hơn
  styles: [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { brightness: 70 }, // Tăng độ sáng toàn bộ
        { saturation: 100 }, // Tăng độ bão hòa màu nhẹ
        { contrast: 100 }, // Tăng độ tương phản
        { gamma: 0.1 }, // Điều chỉnh gamma cho vùng tối
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        { lightness: 75 }, // Làm sáng phong cảnh
      ],
    },
    {
      featureType: "poi", // Các điểm đánh dấu
      elementType: "labels",
      stylers: [
        { visibility: "on" },
        { lightness: 40 }, // Làm sáng nhãn
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        { visibility: "on" },
        { lightness: 20 }, // Làm sáng đường
      ],
    },
  ],
};

const GoogleMapComponent = () => {
  const [showInfo, setShowInfo] = useState(false);
  const mapRef = useRef(null);

  // Điều chỉnh bản đồ sau khi tải
  const onMapLoad = (map) => {
    mapRef.current = map;

    // Thêm sự kiện tinh chỉnh độ sáng sau khi bản đồ tải xong
    if (window.google) {
      // Đặt tỷ lệ độ sáng cao hơn cho lớp vệ tinh
      const mapType = mapRef.current.getMapTypeId();
      if (mapType === "satellite" || mapType === "hybrid") {
        // Một số điều chỉnh bổ sung có thể được thực hiện ở đây nếu cần
      }
    }
  };

  return (
    <div className="map-container">
      <h2
        className={`${styles.sourceSerif} text-5xl text-[#3d1085] font-bold text-center mt-4 mb-4`}>
        Our Location
      </h2>
      <LoadScript googleMapsApiKey="AIzaSyAyBjAXybQ98p7VJfnLICb7o1tBKWpOgV0">
        <div style={{ position: "relative" }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={fixedPosition}
            zoom={17}
            options={mapOptions}
            onLoad={onMapLoad}>
            {/* Marker sử dụng biểu tượng mặc định của Google có màu đỏ nổi bật */}
            <Marker
              position={fixedPosition}
              onClick={() => setShowInfo(!showInfo)}
              animation={window.google?.maps?.Animation?.DROP}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize:
                  window.google?.maps?.Size &&
                  new window.google.maps.Size(50, 50),
              }}
            />

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
      </LoadScript>
      <div style={{ textAlign: "center", margin: "20px auto", width: "70%" }}>
        <span className="text-xl font-thin text-purple-700 uppercase">
          Visit us at the address above or contact us at:{" "}
          <strong className="font-bold">0123 456 789</strong>
        </span>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
