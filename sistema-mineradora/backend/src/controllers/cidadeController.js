import supabase from "../config/supabaseClient.js";

export async function listarCidades(req, res) {
  const { data, error } = await supabase.from("cidades").select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
}

export async function criarCidade(req, res) {
  const { data, error } = await supabase
    .from("cidades")
    .insert([req.body])
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
}

export async function deletarCidade(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("cidades")
    .delete()
    .eq("id", id)
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
}

export async function atualizarCidade(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("cidades")
    .update(req.body)
    .eq("id", id)
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
}
