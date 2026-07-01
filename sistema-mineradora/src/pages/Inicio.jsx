import React from "react";
import "../style/App.css";
export default function Inicio() {
  return (
    <div id="divchefeinicio">
      <div id="divinicio">
        <h1>Bem-vindo ao sistema integrado de Mineradora</h1>
        <h2>
          Gerencie seus recursos para mineração agora de forma centralizada!
        </h2>
        <br></br>
      </div>
      <br></br>
      <div className="gridcards">
        <div className="cardinicioh3">
        <h3>MÓDULOS DISPONÍVEIS:</h3>
        </div>
        <div className="cardinicio">
          <h3>Cidades</h3>
          <p>controle as cidades onde a mineradora atua.</p>
        </div>
        <div className="cardinicio">
          <h3>Equipamentos</h3>
          <p>gerencie equipamentos, maquinas, marcas, modelos, setores</p>
        </div>
        <div className="cardinicio">
          <h3>Funcionarios</h3>
          <p>cadastre e gerencie os colaboradores da empresa</p>
        </div>
        <div className="cardinicio">
          <h3>Serviços</h3>
          <p>acompanhe os serviços prestados pela empresa</p>
        </div>
      </div>
    </div>
  );
}
