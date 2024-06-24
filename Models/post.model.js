import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field required"], 
    }, 
    category: {
      type: String,
      required: [true, "category field required"],
    },
    location: {
      type: String,
      required: [true, "location field  required"],
    },
    price: {
      type: Number,
      required: [true, "price field required"],
    },
    sqft: {
      type: Number,
      required: [true, "price field required"],
    },
    bed: {
      type: Number,
      required: [true, "price  field required"],
    },
    bath: {
      type: Number,
      required: [true, "price field required"],
    },
    postImages: {
      public_id: String,
      url: String,
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", postSchema);
