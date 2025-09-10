import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../constants";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (file, folderName) => {
  try {
    if (!file) {
      return { success: false, msg: "No file provided" };
    }

    if (typeof file === "string") {
      return { success: true, data: file };
    }

    if (typeof file === "object") {
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: "image/jpeg",
        name: file.uri?.split("/").pop() || "file.jpg",
      });

      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);

      const res = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("upload image result", res.data);

      return { success: true, data: res.data.secure_url };
    }

    return { success: false, msg: "Invalid file type provided" };
  } catch (error) {
    console.log("error uploading file", error);
    return { success: false, msg: error.message || "Could not upload file" };
  }
};

export const getProfileImage = (file) => {
  if (!file) {
    return require("../assets/images/defaultAvatar.png");
  }

  if (typeof file === "string") {
    // Validate it's a URL or return default
    return /^https?:\/\//.test(file)
      ? file
      : require("../assets/images/defaultAvatar.png");
  }

  if (typeof file === "object" && file.uri) {
    return file.uri;
  }

  return require("../assets/images/defaultAvatar.png");
};

export const getImageForExam = (title) => {
  const lower = title?.toLowerCase().replace(/[.\s]/g, "");

  if (lower?.includes("jamb")) return require("../assets/images/jamb.png");
  if (lower?.includes("waec")) return require("../assets/images/waec.webp");
  if (lower?.includes("ncee") || lower?.includes("bece"))
    return require("../assets/images/neco.png");
  if (lower?.includes("nda")) return require("../assets/images/NDA.png");
  if (lower?.includes("sat")) return require("../assets/images/sat.png");
  if (lower?.includes("toefl")) return require("../assets/images/toefl.png");
  if (lower?.includes("act")) return require("../assets/images/act.png");

  return null;
};
