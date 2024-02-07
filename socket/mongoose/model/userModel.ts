import mongoose from "mongoose";
import { userSchema } from "../schemas/userSchema";

export const UserData = mongoose.model("SocketUsers", userSchema);