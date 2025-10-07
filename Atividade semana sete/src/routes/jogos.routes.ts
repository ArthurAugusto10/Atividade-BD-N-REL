import { Router, type Request, type Response } from 'express';
import Jogo from '../models/Jogo.js'; 

const router = Router();

// ROTA GET: Listar todos os jogos
router.get("/", async (req: Request, res: Response) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ mensagem: "Ocorreu um erro ao buscar os jogos." });
  }
});

// ROTA POST: Inserir um novo jogo
router.post("/", async (req: Request, res: Response) => {
  try {
    // req.body já vem com os dados do jogo (ex: { titulo: "Elden Ring", ... })
    const novoJogo = new Jogo(req.body); 
    await novoJogo.save();
    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao criar o jogo.", detalhes: error });
  }
});

// ROTA PUT: Atualizar um jogo pelo ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jogoAtualizado = await Jogo.findByIdAndUpdate(id, req.body, { new: true }); // {new: true} retorna o documento atualizado

    if (!jogoAtualizado) {
      return res.status(404).json({ mensagem: "Jogo não encontrado." });
    }
    res.json(jogoAtualizado);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao atualizar o jogo.", detalhes: error });
  }
});

// ROTA DELETE: Remover um jogo pelo ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jogoRemovido = await Jogo.findByIdAndDelete(id);

    if (!jogoRemovido) {
      return res.status(404).json({ mensagem: "Jogo não encontrado." });
    }
    res.json({ mensagem: "Jogo removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao remover o jogo.", detalhes: error });
  }
});

export default router;