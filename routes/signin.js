import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";
import { validateLogin } from "../validator/signinValidator.js";

import { login } from "../controller/usersController.js";

const signinRouter = Router();

signinRouter.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    validateLogin.parse({ email, password });
    const token = await login({ email, password });
    if (!token) {
      const newError = new CustomHttpError({
        message: `E-mail e/ou senha incorretos.`,
      });
      newError.unauthorized({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.status(200).json(token);
  } catch (err) {
    next(err);
  }
});

export { signinRouter };
