import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "../styles/pages/landing.css";
import { Link } from "react-router-dom";

import Logo from "../images/logo.svg";
import Criancas from "../images/landing.svg";

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={Logo} alt="Happy" />
        <main>
          <h1>Projeto Senhoras & Senhores</h1>
          <p>Visite uma das nossas casa de repouso para idosos.</p>
        </main>
        <div className="location">
          <strong>Campos dos Goytacazes</strong>
          <span>Rio de Janeiro</span>
        </div>
        <Link to="/map" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
