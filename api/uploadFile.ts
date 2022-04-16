import axios from "axios";
import { ImageObjectType } from "types/api";

export const uploadFile = (fileData: ImageObjectType) => {
  return axios.post(
    "/api/upload",
    {
      fileData,
    },
    {
      onUploadProgress: console.log,
    }
  );
};
