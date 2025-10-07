// src/models/Jogo.ts

// ✅ Apenas esta linha precisa ser alterada
import { Schema, model } from 'mongoose';

// Interface para definir os tipos de dados do Jogo
interface IJogo {
  titulo: string;
  genero: string;
  anoLancamento: number;
}

// Agora "new Schema(...)" funciona, pois "Schema" é a classe correta
const jogoSchema = new Schema<IJogo>({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  anoLancamento: { type: Number, required: true },
});

// A função "model" também foi importada corretamente
const Jogo = model<IJogo>('Jogo', jogoSchema);

export default Jogo;