import React, { useState } from "react";
import Menu from "./components/Menu";
import Inicio from "./pages/Inicio";
import Equipamentos from "./pages/Equipamentos";
import Cidades from "./pages/Cidades";
import Funcionarios from "./pages/Funcionarios";
import Servicos from "./pages/Servicos";
import './style/App.css'
function App() {
  const [pagina, setPagina] = useState("inicio");

  return (
    <div>
      <Menu setPagina={setPagina} />

      {pagina === "inicio" && <Inicio />}
      {pagina === "cidades" && <Cidades />}
      {pagina === "equipamentos" && <Equipamentos />}
      {pagina === "funcionarios" && <Funcionarios />}
      {pagina === "servicos" && <Servicos />}
      
    </div>
  );
}

export default App;
