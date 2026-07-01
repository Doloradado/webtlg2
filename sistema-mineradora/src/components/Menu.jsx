import React from "react";
import '../style/App.css'
export default function Menu({ setPagina }) {
  return (
    <nav id="navmenu">
      <h1>SISTEMA INTEGRADO DE MINERADORA</h1>
      <button onClick={() => setPagina("inicio")}>Início</button>
      <button onClick={() => setPagina("cidades")}>Cidades</button>
      <button onClick={() => setPagina("equipamentos")}>Equipamentos</button>
      <button onClick={() => setPagina("funcionarios")}>Funcionários</button>
      <button onClick={() => setPagina("servicos")}>Serviços</button>
    </nav>
  );
}
