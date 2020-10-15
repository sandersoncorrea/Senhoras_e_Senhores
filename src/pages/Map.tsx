import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map as Mapleaflet, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Pin from "../images/pin.svg";
import "../styles/pages/map.css";

function Map() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={Pin} alt="+" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita ;)</p>
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
      </Mapleaflet>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default Map;
