import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import "../style/funcionario.css";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function carregarFuncionarios() {
    setLoading(true);

    const { data, error } = await supabase.from("funcionarios").select("*");

    if (error) {
      console.error("Erro ao buscar funcionários:", error);
      setLoading(false);
      return;
    }

    setFuncionarios(data || []);
    setLoading(false);
  }

  function limparCampos() {
    setNome("");
    setCargo("");
    setEditandoId(null);
  }

  async function cadastrar() {
    if (!nome || !cargo) {
      return alert("Preencha todos os campos!");
    }

    const { error } = await supabase
      .from("funcionarios")
      .insert([{ nome, cargo }]);

    if (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      return;
    }

    limparCampos();
    carregarFuncionarios();
  }

  async function deletar(id) {
    const ok = window.confirm("Deseja excluir este funcionário?");
    if (!ok) return;

    const { error } = await supabase.from("funcionarios").delete().eq("id", id);

    if (error) {
      console.error("Erro ao deletar funcionário:", error);
      return;
    }

    carregarFuncionarios();
  }

  function iniciarEdicao(f) {
    setEditandoId(f.id);
    setNome(f.nome);
    setCargo(f.cargo);
  }

  async function atualizar() {
    if (!editandoId) return;

    const { error } = await supabase
      .from("funcionarios")
      .update({
        nome,
        cargo,
      })
      .eq("id", editandoId);

    if (error) {
      console.error("Erro ao atualizar funcionário:", error);
      return;
    }

    limparCampos();
    carregarFuncionarios();
  }

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
            className="botaoatualizarfuncionarios"
            onClick={editandoId ? atualizar : cadastrar}
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button
              className="botaocancelarfuncionarios"
              onClick={limparCampos}
            >
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
