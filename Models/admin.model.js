import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field required"], 
  },
  password: {
    type: String,
    required: [true, "password field required"],
    select: false,
  },
  email: {
    type: String,
    required: [true, "email field required"],
  },
  phone: {
    type: Number,
    required: [true, "phone field required"],
  },
});

export const Admin = mongoose.model("admin", adminSchema);
