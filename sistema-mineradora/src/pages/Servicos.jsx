import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import "../style/servicos.css";

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

  async function carregarServicos() {
    setLoading(true);

    const { data, error } = await supabase.from("servicos").select("*");

    if (error) {
      console.error("Erro ao buscar serviços:", error);
      setLoading(false);
      return;
    }

    setServicos(data || []);
    setLoading(false);
  }

  function limparCampos() {
    setNome("");
    setDescricao("");
    setStatus("");
    setDataServico("");
    setEditandoId(null);
  }

  async function cadastrar() {
    if (!nome || !descricao || !status || !dataServico) {
      return alert("Preencha todos os campos!");
    }

    const { error } = await supabase.from("servicos").insert([
      {
        nome,
        descricao,
        status,
        data_servico: dataServico,
      },
    ]);

    if (error) {
      console.error("Erro ao cadastrar serviço:", error);
      return;
    }

    limparCampos();
    carregarServicos();
  }

  async function deletar(id) {
    const ok = window.confirm("Deseja excluir este serviço?");
    if (!ok) return;

    const { error } = await supabase.from("servicos").delete().eq("id", id);

    if (error) {
      console.error("Erro ao deletar serviço:", error);
      return;
    }

    carregarServicos();
  }

  function iniciarEdicao(s) {
    setEditandoId(s.id);
    setNome(s.nome);
    setDescricao(s.descricao);
    setStatus(s.status);
    setDataServico(s.data_servico);
  }

  async function atualizar() {
    if (!editandoId) return;

    const { error } = await supabase
      .from("servicos")
      .update({
        nome,
        descricao,
        status,
        data_servico: dataServico,
      })
      .eq("id", editandoId);

    if (error) {
      console.error("Erro ao atualizar serviço:", error);
      return;
    }

    limparCampos();
    carregarServicos();
  }

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
            className="botaoatualizarservicos"
            onClick={editandoId ? atualizar : cadastrar}
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button className="botaocancelarservicos" onClick={limparCampos}>
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
