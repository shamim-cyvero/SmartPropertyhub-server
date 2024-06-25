import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, "comment field required"],
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("contact", contactSchema);
