import React from "react";
import carteiraGigante from "../img/carteira gigante.png";

export default function ThreeCards() {
  return (
    <div className="three-cards">
      <div className="three-cards-glow" />

      <img
        src={carteiraGigante}
        alt="Cartões financeiros do MeuFinance"
        className="finance-cards-image"
      />

      <div className="three-cards-shine" />
    </div>
  );
}