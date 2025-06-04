import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

function connectDatabase() {
  mongoose
    .connect(DATABASE_URL, {
      serverSelectionTimeoutMS: 2000,
    })
    .then(() => console.log("MongoDB conectado com sucesso"))
    .catch((err) => console.log("Erro de conexão:", err));
}

export { connectDatabase };
