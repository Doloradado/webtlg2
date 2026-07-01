import express from "express";
import {
  listarServicos,
  criarServico,
  deletarServico,
  atualizarServico,
} from "../controllers/servicoController.js";

const router = express.Router();

router.get("/", listarServicos);
router.post("/", criarServico);
router.delete("/:id", deletarServico);
router.put("/:id", atualizarServico);

export default router;
