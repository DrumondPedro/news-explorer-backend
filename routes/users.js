import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";

import { sendUser } from "../controller/usersController.js";

const userRouter = Router();

userRouter.get("/me", async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await sendUser(userId);
    if (!user) {
      const newError = new CustomHttpError({
        message: `Não foi possivel encontrar suário com o ID: ${userId}`,
      });
      newError.notFound({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export { userRouter };
