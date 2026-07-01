import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../style/equipamento.css"

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);

  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  const carregarEquipamentos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/equipamentos");
      setEquipamentos(response.data);
    } finally {
      setLoading(false);
    }
  };

  const limparCampos = () => {
    setNome("");
    setSetor("");
    setTipo("");
    setMarca("");
    setModelo("");
    setEditandoId(null);
  };

  const cadastrar = async () => {
    if (!nome || !setor || !tipo || !marca || !modelo) {
      return alert("Preencha todos os campos!");
    }

    await api.post("/equipamentos", {
      nome,
      setor,
      tipo,
      marca,
      modelo,
    });

    limparCampos();
    carregarEquipamentos();
  };

  const deletar = async (id) => {
    const ok = window.confirm("Deseja excluir este equipamento?");
    if (!ok) return;

    await api.delete(`/equipamentos/${id}`);
    carregarEquipamentos();
  };

  const iniciarEdicao = (e) => {
    setEditandoId(e.id);
    setNome(e.nome);
    setSetor(e.setor);
    setTipo(e.tipo);
    setMarca(e.marca);
    setModelo(e.modelo);
  };

  const atualizar = async () => {
    if (!editandoId) return;

    await api.put(`/equipamentos/${editandoId}`, {
      nome,
      setor,
      tipo,
      marca,
      modelo,
    });

    limparCampos();
    carregarEquipamentos();
  };

  return (
    <div className="paginaequipamentos">
      <h2>Gestão de Equipamentos</h2>

      <div className="divequipamentos">
        <h3>{editandoId ? "Editar Equipamento" : "Novo Equipamento"}</h3>

        <div className="cardequipamentos">
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            placeholder="Setor"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          />

          <input
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          <input
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />

          <input
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>

        <div className="botoesequipamentos">
          <button
            onClick={editandoId ? atualizar : cadastrar}
            className="botaoatualizarequipamentos"
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button onClick={limparCampos} className="botaocancelarequipamentos">
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="cardmostrarequipamentos">
        <h3>Equipamentos Cadastrados</h3>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="tabelaequipamentos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Setor</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {equipamentos.map((e) => (
                <tr key={e.id}>
                  <td>{e.nome}</td>
                  <td>{e.setor}</td>
                  <td>{e.tipo}</td>
                  <td>{e.marca}</td>
                  <td>{e.modelo}</td>

                  <td>
                    <button
                      className="botaoeditarequipamentos"
                      onClick={() => iniciarEdicao(e)}
                    >
                      Editar
                    </button>

                    <button
                      className="botaodeletarequipamentos"
                      onClick={() => deletar(e.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
