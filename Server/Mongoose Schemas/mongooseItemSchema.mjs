import mongoose from "mongoose";
import { farmer } from "./mongooseUserSchema.mjs";
const itemSchema = mongoose.Schema({
  productName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  productDiscription: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  productPicture: {
    type: Buffer,
    required: true,
  },
  productCategorie: {
    type: mongoose.Schema.Types.String,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "farmer",
  },
});
export const item = mongoose.model("item", itemSchema);
