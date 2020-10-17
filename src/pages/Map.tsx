import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map as Mapleaflet, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import "leaflet/dist/leaflet.css";
import Pin from "../images/pin.svg";
import "../styles/pages/map.css";

const mapIcon = Leaflet.icon({
  iconUrl: Pin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

function Map() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={Pin} alt="+" />

          <h2>Escolha um asilo no mapa</h2>
          <p>Muitos idosos estão esperando sua visita ;)</p>
        </header>
        <footer>
          <strong>Campos dos Goytacazes</strong>
          <span>Rio de Janeiro</span>
        </footer>
      </aside>

      <Mapleaflet
        center={[-21.7482345, -41.3330914]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Marker icon={mapIcon} position={[-21.7482345, -41.3330914]}>
          <Popup
            minWidth={240}
            maxWidth={240}
            closeButton={false}
            className="map-popup"
          >
            Asilo Monsenhor Severino
            <Link to="/asilos/1">
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </Mapleaflet>

      <Link to="/asilos/create" className="create-asilo">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default Map;
