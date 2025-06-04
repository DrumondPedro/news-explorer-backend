import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";
import {
  validateGetArticle,
  validateCreateArticle,
  validateDeleteArticle,
} from "../validator/articleValidator.js";

import {
  sendArticles,
  createArticle,
  deleteArticle,
} from "../controller/articlesController.js";

const articleRouter = Router();

articleRouter.get("/", async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    validateGetArticle.parse({ ownerId });
    const articles = await sendArticles({ ownerId });
    if (!articles.length) {
      const newError = new CustomHttpError({
        message: "Nenhum artigo encontrado",
      });
      newError.notFound({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

articleRouter.post("/", async (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const ownerId = req.user._id;
  try {
    validateCreateArticle.parse({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      ownerId,
    });
    const newArticle = await createArticle({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      ownerId,
    });
    if (!newArticle) {
      const newError = new CustomHttpError({
        message: `Não foi possivel salvar artigo.`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.status(201).json(newArticle);
  } catch (err) {
    next(err);
  }
});

articleRouter.delete("/:articleId", async (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;
  try {
    validateDeleteArticle.parse({ articleId, userId });
    const deletedArticle = await deleteArticle({ articleId, userId });
    if (!deletedArticle) {
      const newError = new CustomHttpError({
        message: `Não foi possivel remover artigo com id: ${articleId}.`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
});

export { articleRouter };
