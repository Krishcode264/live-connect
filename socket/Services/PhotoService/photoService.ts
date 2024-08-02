import  mongoose, {  Schema } from "mongoose";
import { AwsHandler } from "../../aws";
import { PhotosData } from "../../mongoose/schemas/photoSchema";
import { UserData } from "../../mongoose/schemas/userSchema";
import type { photoSchematype } from "../../types/types";

export class PhotoService {
  static async savePhoto(data: photoSchematype) {
    return await new PhotosData({ ...data }).save();
  }

  static async updatePhotoUrl(url: string, _id: mongoose.Types.ObjectId) {
    return new Promise(async (res, rej) => {
      try {
        const updatedPhoto = await PhotosData.findByIdAndUpdate(_id, {
          imageUrl: url,
          urlExpirationTime: new Date(new Date().getTime() + 1600 * 1000),
        });
        if (updatedPhoto) {
          res(true);
        }
      } catch (err) {
        rej(false);
      }
    });
  }

  static async getPhotosbyId(id: string) {
    try {
      const user = await UserData.findOne({ id });
      if (user) {
        const photos = await PhotosData.find({ uploader: user._id });
        return await Promise.all(
          photos.map(async (photo) => {
         console.log(
           new Date() > new Date(photo.urlExpirationTime.toISOString()));
            if (new Date() > new Date(photo.urlExpirationTime.toISOString())) {
              const url = await AwsHandler.getObjectUrl(photo.key, 1800);
              await this.updatePhotoUrl(url, photo._id);
              return {
                _id: photo._id,
                likes: photo.likes,
                uploadedAt: photo.uploadedAt,
                imageUrl: url,
              };
            }
            return {
              _id: photo._id,
              likes: photo.likes,
              uploadedAt: photo.uploadedAt,
              imageUrl: photo.imageUrl,
            };
          })
        );
      }
    } catch (err) {
      console.log(err, "err in photo upload ");
      throw Error;
    }
  }
}
