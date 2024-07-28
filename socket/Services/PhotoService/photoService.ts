import { AwsHandler } from "../../aws";
import { PhotosData } from "../../mongoose/schemas/photoSchema";
import { UserData } from "../../mongoose/schemas/userSchema";
import type { photoSchematype } from "../../types/types";

export class PhotoService {
  static async savePhoto(data: photoSchematype) {
    return await new PhotosData({ ...data }).save();
  }

  static async getPhotosbyId(id: string) {
    try {
      const user = await UserData.findOne({ id });
      if (user) {
        const photos = await PhotosData.find({ uploader: user._id });
        return await Promise.all(
          photos.map(async (photo) => {
            if (new Date() > photo.urlExpirationTime) {
              const url = await AwsHandler.getObjectUrl(photo.key, 1800);
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
