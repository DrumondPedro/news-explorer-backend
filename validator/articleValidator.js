import { z } from "zod";

const validateCreateArticle = z.object({
  keyword: z.string(),
  title: z.string(),
  text: z.string(),
  date: z.string(),
  source: z.string(),
  link: z.string().url(),
  image: z.string().url(),
  ownerId: z.string().min(10),
});

const validateGetArticle = z.object({
  ownerId: z.string().min(10),
});

const validateDeleteArticle = z.object({
  articleId: z.string(),
  userId: z.string().min(10),
});

export { validateCreateArticle, validateGetArticle, validateDeleteArticle };
