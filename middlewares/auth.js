import jwt from "jsonwebtoken";
import "dotenv/config";

import CustomHttpError from "../errors/CustomHttpError.js";

const { NODE_ENV, KEY_SECRET } = process.env;

export default (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      const newError = new CustomHttpError({
        message: `Autorização necessária`,
      });
      newError.unauthorized({ method: `${req.method}`, path: "Auth" });
      throw newError;
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(
      token,
      NODE_ENV === "production" ? KEY_SECRET : "alternative-test-key",
      (err, data) => {
        if (err) {
          const newError = new CustomHttpError({
            message: `Token inválido`,
          });
          newError.forbidden({ method: `${req.method}`, path: "Auth" });
          throw newError;
        }
        return data;
      }
    );
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};
