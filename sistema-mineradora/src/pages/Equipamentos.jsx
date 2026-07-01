import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import "../style/equipamento.css";

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

  async function carregarEquipamentos() {
    setLoading(true);

    const { data, error } = await supabase.from("equipamentos").select("*");

    if (error) {
      console.error("Erro ao buscar equipamentos:", error);
      setLoading(false);
      return;
    }

    setEquipamentos(data || []);
    setLoading(false);
  }

  function limparCampos() {
    setNome("");
    setSetor("");
    setTipo("");
    setMarca("");
    setModelo("");
    setEditandoId(null);
  }

  async function cadastrar() {
    if (!nome || !setor || !tipo || !marca || !modelo) {
      return alert("Preencha todos os campos!");
    }

    const { error } = await supabase.from("equipamentos").insert([
      {
        nome,
        setor,
        tipo,
        marca,
        modelo,
      },
    ]);

    if (error) {
      console.error("Erro ao cadastrar equipamento:", error);
      return;
    }

    limparCampos();
    carregarEquipamentos();
  }

  async function deletar(id) {
    const ok = window.confirm("Deseja excluir este equipamento?");
    if (!ok) return;

    const { error } = await supabase.from("equipamentos").delete().eq("id", id);

    if (error) {
      console.error("Erro ao deletar equipamento:", error);
      return;
    }

    carregarEquipamentos();
  }

  function iniciarEdicao(e) {
    setEditandoId(e.id);
    setNome(e.nome);
    setSetor(e.setor);
    setTipo(e.tipo);
    setMarca(e.marca);
    setModelo(e.modelo);
  }

  async function atualizar() {
    if (!editandoId) return;

    const { error } = await supabase
      .from("equipamentos")
      .update({
        nome,
        setor,
        tipo,
        marca,
        modelo,
      })
      .eq("id", editandoId);

    if (error) {
      console.error("Erro ao atualizar equipamento:", error);
      return;
    }

    limparCampos();
    carregarEquipamentos();
  }

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
            className="botaoatualizarequipamentos"
            onClick={editandoId ? atualizar : cadastrar}
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button
              className="botaocancelarequipamentos"
              onClick={limparCampos}
            >
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
