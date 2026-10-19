import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config/env.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary as a video.
 * @param {Buffer} fileBuffer - The file buffer from multer.
 * @returns {Promise<Object>} - The Cloudinary upload result.
 */
export const uploadVideoToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "reels",
      },
      (error, result) => {
        if (error) {
          console.error("[CLOUDINARY] Upload stream error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Uploads a raw file (PDF, Zip, Word, Excel, etc.) to Cloudinary.
 * @param {Buffer} fileBuffer - The file buffer from multer.
 * @returns {Promise<Object>} - The Cloudinary upload result.
 */
export const uploadFileToCloudinary = (fileBuffer, folder = "resources") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (error) {
          console.error("[CLOUDINARY] Upload file stream error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Uploads an image (Buffer, Base64 data URI, or URL) to Cloudinary.
 * @param {Buffer|string} imageSource - The file buffer or base64 string.
 * @param {string} folder - Destination folder on Cloudinary.
 * @returns {Promise<Object>} - The Cloudinary upload result.
 */
export const uploadImageToCloudinary = (imageSource, folder = "profiles") => {
  return new Promise((resolve, reject) => {
    if (typeof imageSource === "string") {
      cloudinary.uploader.upload(
        imageSource,
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("[CLOUDINARY] Upload image error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
    } else {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("[CLOUDINARY] Upload image stream error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      uploadStream.end(imageSource);
    }
  });
};

export default cloudinary;
