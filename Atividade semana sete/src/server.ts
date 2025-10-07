import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importando suas rotas (lembre-se da extensão .js)
import jogosRouter from './routes/jogos.routes.js';

// 1. Configuração das variáveis de ambiente
dotenv.config();

// 2. Inicialização do Express
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/api_games';

// 3. Middlewares
// Essencial para o Express entender corpos de requisição em JSON
app.use(express.json());

// 4. Rotas da API
app.use('/jogos', jogosRouter);

// 5. Função de inicialização do servidor
const startServer = async () => {
  try {
    // Conecta ao MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB com sucesso!");

    // Inicia o servidor Express apenas após a conexão bem-sucedida
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB ou iniciar o servidor:", error);
    process.exit(1); // Encerra o processo se não conseguir conectar ao DB
  }
};

// Inicia a aplicação
startServer();