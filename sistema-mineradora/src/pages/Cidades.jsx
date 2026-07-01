import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../style/cidade.css"

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

  const carregarCidades = async () => {
    setLoading(true);
    try {
      const response = await api.get("/cidades");
      setCidades(response.data);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async () => {
    if (!pais || !estado || !nome || !cep) {
      return alert("Preencha todos os campos!");
    }

    try {
      await api.post("/cidades", {
        pais,
        estado,
        nome,
        cep,
      });

      limparCampos();
      carregarCidades();
    } catch (error) {
      console.error("Erro ao cadastrar cidade:", error);
    }
  };

  const deletar = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta cidade?",
    );
    if (!confirmar) return;

    try {
      await api.delete(`/cidades/${id}`);
      carregarCidades();
    } catch (error) {
      console.error("Erro ao deletar cidade:", error);
    }
  };

  const iniciarEdicao = (cidade) => {
    setEditandoId(cidade.id);
    setPais(cidade.pais);
    setEstado(cidade.estado);
    setNome(cidade.nome);
    setCep(cidade.cep);
  };

  const atualizar = async () => {
    if (!editandoId) return;

    try {
      await api.put(`/cidades/${editandoId}`, {
        pais,
        estado,
        nome,
        cep,
      });

      limparCampos();
      carregarCidades();
    } catch (error) {
      console.error("Erro ao atualizar cidade:", error);
    }
  };

  const limparCampos = () => {
    setPais("");
    setEstado("");
    setNome("");
    setCep("");
    setEditandoId(null);
  };

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
            onClick={editandoId ? atualizar : cadastrar}
            className="botaoatualizarcidades"
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button onClick={limparCampos} className="botaocancelarcidades">
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
