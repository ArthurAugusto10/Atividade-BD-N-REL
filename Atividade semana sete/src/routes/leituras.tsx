

const express = require("express");
const router = express.Router();
const Leitura = require("../models/Leitura");

// Listar todas as leituras
router.get("/", async (_req: any, res: { json: (arg0: any) => void; }) => {
    const leituras = await Leitura.find();
    res.json(leituras);
});

// Inserir nova leitura
router.post("/", async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
    const leitura = new Leitura(req.body);
    await leitura.save();
    res.status(201).json(leitura);
});

router.put("/:id", async (req: { params: { id: any; }; body: any; }, res: { json: (arg0: any) => void; }) => {
    const leituraAtualizada = await Leitura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(leituraAtualizada);
});

router.delete("/:id", async (req: { params: { id: any; }; }, res: { json: (arg0: { mensagem: string; }) => void; }) => {
    await Leitura.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Jogos removido com sucesso!" });
});

module.exports = router;