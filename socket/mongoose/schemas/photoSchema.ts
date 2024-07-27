import mongoose from "mongoose";
import { Schema } from "mongoose";
export const photoSchema = new Schema({
  key: { type: String, required: true },
  uploader: { type: Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});


export const PhotosData = mongoose.model("Photo", photoSchema);