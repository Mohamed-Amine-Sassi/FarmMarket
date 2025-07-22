import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.String,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  phoneNumber: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  dateOfBirth: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
});

const buyerSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.String,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  phoneNumber: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  dateOfBirth: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
});

export const farmer = mongoose.model("farmer", farmerSchema);
export const buyer = mongoose.model("buyer", buyerSchema);
