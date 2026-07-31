import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LiveMap({ lid1, lid2, lid3 }) {
  const getIcon = (risk) => {
    switch (risk) {
      case "Safe":
        return greenIcon;

      case "Monitor":
        return yellowIcon;

      case "Warning":
        return orangeIcon;

      case "Critical":
        return redIcon;

      default:
        return greenIcon;
    }
  };

  const lids = [
    {
      name: "T-Nagar Lid 1",
      lat: 13.0418,
      lng: 80.2337,
      data: lid1,
    },
    {
      name: "T-Nagar Lid 2",
      lat: 13.0427,
      lng: 80.2350,
      data: lid2,
    },
    {
      name: "T-Nagar Lid 3",
      lat: 13.0438,
      lng: 80.2362,
      data: lid3,
    },
  ];

  return (
    <div className="rounded-2xl overflow-hidden border border-emerald-500">

      <MapContainer
        center={[13.0428, 80.2348]}
        zoom={16}
        style={{ height: "500px", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {lids.map((lid) => (
          <Marker
            key={lid.name}
            position={[lid.lat, lid.lng]}
            icon={getIcon(lid.data.floodRisk)}
          >

            <Popup>

              <h2 style={{ fontWeight: "bold" }}>
                {lid.name}
              </h2>

              <hr />

              <p>
                <b>Water :</b> {lid.data.water} cm
              </p>

              <p>
                <b>Gas :</b> {lid.data.gas}
              </p>

              <p>
                <b>Temperature :</b> {lid.data.temp} °C
              </p>

              <p>
                <b>Status :</b> {lid.data.floodRisk}
              </p>

            </Popup>

          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}