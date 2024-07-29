import { Schema } from "mongoose";
import mongoose from "mongoose";
export const userSchema = new Schema({
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, // Set default to current timestamp
  },
  id: { type: String },
  password: { type: String },
  socketID: { type: String },
  email: { type: String },
  isConnected: { type: Boolean, default: false },
  country: { type: String, default: "" },
  intrests: { type: [String], default: [] },
  age: { type: Number, default: 0 },
  gender: { type: String, default: "unknown" },
  profile: { type: String },
  friends:{type:Schema.Types.ObjectId,ref:"User"},
  likedPhotos: [{type:Schema.Types.ObjectId, ref:"Photo"}],
  authType: {
    provider: { type: String },
    expires: {
      type: String,
    },
  },
});
export const UserData = mongoose.model("User", userSchema);
