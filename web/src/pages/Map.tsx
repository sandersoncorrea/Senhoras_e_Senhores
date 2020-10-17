import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map as Mapleaflet, TileLayer, Marker, Popup } from "react-leaflet";

import Pin from "../images/pin.svg";
import "../styles/pages/map.css";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Asilo {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function Map() {
  const [asilos, setAsilos] = useState<Asilo[]>([]);

  useEffect(() => {
    api.get("asilos").then((response) => {
      const { data } = response;
      setAsilos(data);
    });
  }, []);

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
        {asilos.map((asilo) => {
          return (
            <Marker
              key={asilo.id}
              icon={mapIcon}
              position={[asilo.latitude, asilo.longitude]}
            >
              <Popup
                minWidth={240}
                maxWidth={240}
                closeButton={false}
                className="map-popup"
              >
                {asilo.name}
                <Link to={`/asilos/${asilo.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Mapleaflet>

      <Link to="/asilos/create" className="create-asilo">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default Map;
