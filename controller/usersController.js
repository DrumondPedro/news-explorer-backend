import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/User.js";
import CustomHttpError from "../errors/CustomHttpError.js";

const { NODE_ENV, KEY_SECRET } = process.env;

async function sendUser(id) {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.notFound({ method: "MONGO", path: "User" });
    throw newError;
  }
}

async function createUser({ name, email, password }) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await UserModel.create({
      name,
      email,
      password: hash,
    });
    return {
      name: createdUser.name,
      email: createdUser.email,
      _id: createdUser._id,
    };
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Create User" });
    throw newError;
  }
}

async function login({ email, password }) {
  try {
    const user = await UserModel.findUserByCredentials({ email, password });
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? KEY_SECRET : "alternative-test-key",
      {
        expiresIn: "7d",
      }
    );
    return { token };
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.unauthorized({ method: "MONGO", path: "Login" });
    throw newError;
  }
}

export { sendUser, createUser, login };
