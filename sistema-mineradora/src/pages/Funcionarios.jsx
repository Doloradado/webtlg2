import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../style/funcionario.css"

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    setLoading(true);
    try {
      const response = await api.get("/funcionarios");
      setFuncionarios(response.data);
    } finally {
      setLoading(false);
    }
  };

  const limparCampos = () => {
    setNome("");
    setCargo("");
    setEditandoId(null);
  };

  const cadastrar = async () => {
    if (!nome || !cargo) {
      return alert("Preencha todos os campos!");
    }

    await api.post("/funcionarios", {
      nome,
      cargo,
    });

    limparCampos();
    carregarFuncionarios();
  };

  const deletar = async (id) => {
    const ok = window.confirm("Deseja excluir este funcionário?");
    if (!ok) return;

    await api.delete(`/funcionarios/${id}`);
    carregarFuncionarios();
  };

  const iniciarEdicao = (f) => {
    setEditandoId(f.id);
    setNome(f.nome);
    setCargo(f.cargo);
  };

  const atualizar = async () => {
    if (!editandoId) return;

    await api.put(`/funcionarios/${editandoId}`, {
      nome,
      cargo,
    });

    limparCampos();
    carregarFuncionarios();
  };

  return (
    <div className="paginafuncionarios">
      <h2>Gestão de Funcionários</h2>

      <div className="divfuncionarios">
        <h3>{editandoId ? "Editar Funcionário" : "Novo Funcionário"}</h3>

        <div className="cardfuncionarios">
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </div>

        <div className="botoesfuncionarios">
          <button
            onClick={editandoId ? atualizar : cadastrar}
            className="botaoatualizarfuncionarios"
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button onClick={limparCampos} className="botaocancelarfuncionarios">
              Cancelar
            </button>
          )}
        </div>
      </div>

      
      <div className="cardmostrarfuncionarios">
        <h3>Funcionários Cadastrados</h3>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="tabelafuncionarios">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.id}>
                  <td>{f.nome}</td>
                  <td>{f.cargo}</td>

                  <td>
                    <button
                      className="botaoeditarfuncionarios"
                      onClick={() => iniciarEdicao(f)}
                    >
                      Editar
                    </button>

                    <button
                      className="botaodeletarfuncionarios"
                      onClick={() => deletar(f.id)}
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
