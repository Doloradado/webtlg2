import supabase from "../config/supabaseClient.js";

export async function listarEquipamentos(req, res) {
  const { data, error } = await supabase.from("equipamentos").select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
}

export async function criarEquipamento(req, res) {
  const { data, error } = await supabase
    .from("equipamentos")
    .insert([req.body])
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
}

export async function deletarEquipamento(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("equipamentos")
    .delete()
    .eq("id", id)
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
}

export async function atualizarEquipamento(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("equipamentos")
    .update(req.body)
    .eq("id", id)
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
}
