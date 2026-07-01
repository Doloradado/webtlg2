import express from "express";
import {
  listarEquipamentos,
  criarEquipamento,
  deletarEquipamento,
  atualizarEquipamento,
} from "../controllers/equipamentoController.js";

const router = express.Router();

router.get("/", listarEquipamentos);
router.post("/", criarEquipamento);
router.delete("/:id", deletarEquipamento);
router.put("/:id", atualizarEquipamento);
export default router;
