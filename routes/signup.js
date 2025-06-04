import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";
import { validateCreateUser } from "../validator/userValidator.js";

import { createUser } from "../controller/usersController.js";

const signupRouter = Router();

signupRouter.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    validateCreateUser.parse({ name, email, password });
    const newUser = await createUser({ name, email, password });
    if (!newUser) {
      const newError = new CustomHttpError({
        message: `Não foi possivel criar usuário.`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

export { signupRouter };
