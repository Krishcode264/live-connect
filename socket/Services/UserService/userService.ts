import mongoose from "mongoose";
import { UserSchemaType, type User } from "../../types/types";
import { userSchema } from "../../mongoose/schemas/userSchema";
import { v4 as uuidv4 } from "uuid";
import { UserData } from "../../mongoose/schemas/userSchema";
import { PhotosData } from "../../mongoose/schemas/photoSchema";

export default class UserService {
  static saveUserData = async (
    data: UserSchemaType,

    authType: { provider: string; expires?: string }
  ): Promise<UserSchemaType | null> => {
    try {
      const newUser = new UserData({ ...data, id: uuidv4(), authType });
      const savedUser = await newUser.save();
      return savedUser as UserSchemaType | null; // Update the type of savedUser
    } catch (err) {
      console.log(err, "error in savingf user");
      return null;
    }
  };
 static checkUserAlreadyExist = async (email: string) => {
    const users = await UserData.find({ email });
    return users;
  };

  static deleteUserData = async (
    id: string
  ): Promise<UserSchemaType | null> => {
    try {
      const deletedUser = await UserData.findOneAndDelete({ socketID: id });
      return deletedUser as UserSchemaType | null; // Update the type of deletedUser
    } catch (err) {
      console.log(err, "err deleting user ");
      return null;
    }
  };

  static getUserSocketIdById = async (id: string): Promise<string | null> => {
    try {
      const targetUser: UserSchemaType | null = await UserData.findOne({ id });

      if (!targetUser?.socketID) {
        return null; // Return null when user is not found
      }

      return targetUser.socketID;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw error; // Handle the error or rethrow for higher-level handling
    }
  };

  static updateUserData = async (
    query:any,
    data: Partial<UserSchemaType>
  ): Promise<UserSchemaType | null> => {
    try {
      const updateUser = await UserData.findOneAndUpdate(
        query,
        { $set: data },
        { new: true, runValidators: true }
      );
      console.log(updateUser)
      return updateUser as UserSchemaType | null;
    } catch (err) {
      console.log(err,"update user failed")
      return null;
    }
  };
}
