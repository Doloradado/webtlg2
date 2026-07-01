import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../style/servicos.css"

export default function Servicos() {
  const [servicos, setServicos] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [dataServico, setDataServico] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/servicos");
      setServicos(response.data);
    } finally {
      setLoading(false);
    }
  };

  const limparCampos = () => {
    setNome("");
    setDescricao("");
    setStatus("");
    setDataServico("");
    setEditandoId(null);
  };

  const cadastrar = async () => {
    if (!nome || !descricao || !status || !dataServico) {
      return alert("Preencha todos os campos!");
    }

    await api.post("/servicos", {
      nome,
      descricao,
      status,
      data_servico: dataServico,
    });

    limparCampos();
    carregarServicos();
  };

  const deletar = async (id) => {
    const ok = window.confirm("Deseja excluir este serviço?");
    if (!ok) return;

    await api.delete(`/servicos/${id}`);
    carregarServicos();
  };

  const iniciarEdicao = (s) => {
    setEditandoId(s.id);
    setNome(s.nome);
    setDescricao(s.descricao);
    setStatus(s.status);
    setDataServico(s.data_servico);
  };

  const atualizar = async () => {
    if (!editandoId) return;

    await api.put(`/servicos/${editandoId}`, {
      nome,
      descricao,
      status,
      data_servico: dataServico,
    });

    limparCampos();
    carregarServicos();
  };

  return (
    <div className="paginaservicos">
      <h2>Gestão de Serviços</h2>

      <div className="divservicos">
        <h3>{editandoId ? "Editar Serviço" : "Novo Serviço"}</h3>

        <div className="cardservicos">
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <input
            placeholder="Data do serviço"
            value={dataServico}
            onChange={(e) => setDataServico(e.target.value)}
          />
        </div>

        <div className="botoesservicos">
          <button
            onClick={editandoId ? atualizar : cadastrar}
            className="botaoatualizarservicos"
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button onClick={limparCampos} className="botaocancelarservicos">
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="cardmostrarservicos">
        <h3>Serviços Cadastrados</h3>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="tabelaservicos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {servicos.map((s) => (
                <tr key={s.id}>
                  <td>{s.nome}</td>
                  <td>{s.descricao}</td>
                  <td>{s.status}</td>
                  <td>{s.data_servico}</td>

                  <td>
                    <button
                      className="botaoeditarservicos"
                      onClick={() => iniciarEdicao(s)}
                    >
                      Editar
                    </button>

                    <button
                      className="botaodeletarservicos"
                      onClick={() => deletar(s.id)}
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
