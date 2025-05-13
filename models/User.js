import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

import validator from "validator";
import CustomHttpError from "../errors/CustomHttpError.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return validator.isEmail(v);
        },
        message: "Esse não é um email valido",
      },
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  {
    versionKey: false,
    statics: {
      async findUserByCredentials({ email, password }) {
        try {
          const user = await this.findOne({ email }).select("+password");
          if (!user) {
            throw new CustomHttpError({
              message: `E-mail ou senha incorretos`,
            });
          }
          const matched = await bcrypt.compare(password, user.password);
          if (!matched) {
            throw new CustomHttpError({
              message: `E-mail ou senha incorretos`,
            });
          }
          return user;
        } catch (error) {
          throw error;
        }
      },
    },
  }
);

const UserModel = model("user", userSchema);
export { UserModel };
