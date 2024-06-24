import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field required"],
    },
    phone: {
      type: Number,
      required: [true, "comment field required"],
    },
    email: {
      type: String,
      required: [true, "email field required"],
    },
    message: {
      type: String,
      required: [true, "email field required"],
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("contact", contactSchema);
