import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(cors());
app.options("*", cors());

const notFound = (req, res, next) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.use("", notFound);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
