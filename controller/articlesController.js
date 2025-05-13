import { ArticleModel } from "../models/Article.js";

import CustomHttpError from "../errors/CustomHttpError.js";

async function sendArticles({ ownerId }) {
  try {
    const articles = await ArticleModel.find({ owner: ownerId });
    return articles;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.notFound({ method: "MONGO", path: "Articles" });
    throw newError;
  }
}

async function createArticle({
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
  ownerId,
}) {
  try {
    const newArticle = await ArticleModel.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: ownerId,
    });
    const article = await ArticleModel.findById(newArticle._id);
    return article;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Create Article" });
    throw newError;
  }
}

async function deleteArticle({ articleId, userId }) {
  try {
    const article = await ArticleModel.findById(articleId);
    if (article.owner.toString() !== userId) {
      const newError = new CustomHttpError({
        message: "O usuário não é dono desse artigo",
      });
      newError.badRequest({ method: "MONGO", path: "Delete Article" });
      throw newError;
    }
    const deletedArticle = await ArticleModel.findByIdAndDelete(articleId);
    return deletedArticle;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Delete Article" });
    throw newError;
  }
}

export { sendArticles, createArticle, deleteArticle };
