import mongoose from "mongoose";

function connectDatabase() {
  mongoose
    .connect("mongodb://localhost:27017/newsexplorerdb", {
      serverSelectionTimeoutMS: 2000,
    })
    .then(() => console.log("MongoDB conectado com sucesso"))
    .catch((err) => console.log("Erro de conexão:", err));
}

export { connectDatabase };
