import { Schema, model } from "mongoose";

import validator from "validator";

const articleSchema = new Schema(
  {
    keyword: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return validator.isURL(v);
        },
        message: "Essa não é uma URL valida",
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return validator.isURL(v);
        },
        message: "Essa não é uma URL valida",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

const ArticleModel = model("article", articleSchema);
export { ArticleModel };
