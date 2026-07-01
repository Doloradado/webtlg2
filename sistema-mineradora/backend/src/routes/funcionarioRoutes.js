import express from "express";
import {
  listarFuncionarios,
  criarFuncionario,
  deletarFuncionario,
  atualizarFuncionario,
} from "../controllers/funcionarioController.js";

const router = express.Router();

router.get("/", listarFuncionarios);
router.post("/", criarFuncionario);
router.delete("/:id", deletarFuncionario);
router.put("/:id", atualizarFuncionario);

export default router;
