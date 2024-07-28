import mongoose from "mongoose";
import { Schema } from "mongoose";
export const photoSchema = new Schema({
  key: { type: String, required: true },
  imageUrl: { type: String },
  uploader: { type: Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
  urlExpirationTime: { type: Date ,required:true},
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});


export const PhotosData = mongoose.model("Photo", photoSchema);