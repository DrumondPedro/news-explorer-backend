import { Schema, model } from "mongoose";

import validator from "validator";

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
  }
);

const UserModel = model("user", userSchema);
export { UserModel };
