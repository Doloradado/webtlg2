import express from "express";
import {
  listarCidades,
  criarCidade,
  deletarCidade,
  atualizarCidade,
} from "../controllers/cidadeController.js";

const router = express.Router();

router.get("/", listarCidades);
router.post("/", criarCidade);
router.delete("/:id", deletarCidade);
router.put("/:id", atualizarCidade);

export default router;
