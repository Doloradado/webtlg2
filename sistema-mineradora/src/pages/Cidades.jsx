import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import "../style/cidade.css";

export default function Cidades() {
  const [cidades, setCidades] = useState([]);

  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarCidades();
  }, []);

  async function carregarCidades() {
    setLoading(true);

    const { data, error } = await supabase.from("cidades").select("*");

    if (error) {
      console.error("Erro ao buscar cidades:", error);
      setLoading(false);
      return;
    }

    setCidades(data || []);
    setLoading(false);
  }

  async function cadastrar() {
    if (!pais || !estado || !nome || !cep) {
      return alert("Preencha todos os campos!");
    }

    const { error } = await supabase
      .from("cidades")
      .insert([{ pais, estado, nome, cep }]);

    if (error) {
      console.error("Erro ao cadastrar cidade:", error);
      return;
    }

    limparCampos();
    carregarCidades();
  }

  async function deletar(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta cidade?",
    );

    if (!confirmar) return;

    const { error } = await supabase.from("cidades").delete().eq("id", id);

    if (error) {
      console.error("Erro ao deletar cidade:", error);
      return;
    }

    carregarCidades();
  }

  function iniciarEdicao(cidade) {
    setEditandoId(cidade.id);
    setPais(cidade.pais);
    setEstado(cidade.estado);
    setNome(cidade.nome);
    setCep(cidade.cep);
  }

  async function atualizar() {
    if (!editandoId) return;

    const { error } = await supabase
      .from("cidades")
      .update({
        pais,
        estado,
        nome,
        cep,
      })
      .eq("id", editandoId);

    if (error) {
      console.error("Erro ao atualizar cidade:", error);
      return;
    }

    limparCampos();
    carregarCidades();
  }

  function limparCampos() {
    setPais("");
    setEstado("");
    setNome("");
    setCep("");
    setEditandoId(null);
  }

  return (
    <div className="paginacidades">
      <h2>Gestão de Cidades</h2>

      <div className="divcidades">
        <h3>{editandoId ? "Editar Cidade" : "Nova Cidade"}</h3>

        <div className="cardcidades">
          <input
            placeholder="País"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />

          <input
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />

          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>

        <div className="botoescidades">
          <button
            className="botaoatualizarcidades"
            onClick={editandoId ? atualizar : cadastrar}
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button className="botaocancelarcidades" onClick={limparCampos}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="cardmostrarcidades">
        <h3>Cidades Cadastradas</h3>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="tabelacidades">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Estado</th>
                <th>País</th>
                <th>CEP</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {cidades.map((cidade) => (
                <tr key={cidade.id}>
                  <td>{cidade.nome}</td>
                  <td>{cidade.estado}</td>
                  <td>{cidade.pais}</td>
                  <td>{cidade.cep}</td>

                  <td>
                    <button
                      className="botaoeditarcidades"
                      onClick={() => iniciarEdicao(cidade)}
                    >
                      Editar
                    </button>

                    <button
                      className="botaodeletarcidades"
                      onClick={() => deletar(cidade.id)}
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
