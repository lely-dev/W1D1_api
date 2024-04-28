import multer from "multer";
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudApiKey,
    api_secret: process.env.cloudApiSecret
});

const options = {
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "avatars",
      },
    }),
  };
  
  export default multer(options).single("avatar");