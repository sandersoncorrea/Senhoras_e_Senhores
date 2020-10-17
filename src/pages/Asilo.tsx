import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import "../styles/pages/asilo.css";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Asilo {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weeks: string;
  images: Array<{
    url: string;
    id: string;
  }>;
}

interface RouteParams {
  id: string;
}

export default function Asilo() {
  const params = useParams<RouteParams>();
  const [asilo, setAsilo] = useState<Asilo>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`asilos/${params.id}`).then((response) => {
      const { data } = response;
      setAsilo(data);
    });
  }, [params.id]);

  if (!asilo) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-asilo">
      <Sidebar />

      <main>
        <div className="asilo-details">
          <img src={asilo.images[activeImageIndex].url} alt={asilo.name} />

          <div className="images">
            {asilo.images.map((img, index) => {
              return (
                <button
                  key={img.id}
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={img.url} alt={asilo.name} />
                </button>
              );
            })}
          </div>

          <div className="asilo-details-content">
            <h1>{asilo.name}</h1>
            <p>{asilo.about}</p>

            <div className="map-container">
              <Map
                center={[asilo.latitude, asilo.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[asilo.latitude, asilo.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${asilo.latitude},${asilo.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{asilo.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {asilo.opening_hours}
              </div>
              {asilo.open_on_weeks ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos aos
                  <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos aos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
