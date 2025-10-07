import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

/**
 * Upload an image to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Optional folder name in Cloudinary
 * @returns Upload result with secure_url and public_id
 */
export async function uploadToCloudinary(
  file: string | Buffer,
  folder?: string,
) {
  try {
    const uploadOptions: any = {
      resource_type: "auto",
      folder: folder || "tanijual",
    };

    // If it's a buffer, convert to base64
    let uploadFile = file;
    if (Buffer.isBuffer(file)) {
      uploadFile = `data:image/jpeg;base64,${file.toString("base64")}`;
    }

    const result = await cloudinary.uploader.upload(
      uploadFile as string,
      uploadOptions,
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Deletion result
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of file buffers or base64 strings
 * @param folder - Optional folder name in Cloudinary
 * @returns Array of upload results
 */
export async function uploadMultipleToCloudinary(
  files: (string | Buffer)[],
  folder?: string,
) {
  try {
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file, folder),
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Cloudinary multiple upload error:", error);
    throw new Error("Failed to upload images to Cloudinary");
  }
}

export { cloudinary };
