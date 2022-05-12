import { writeFileSync } from "fs";
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ImageUploadRequestDataType,
  ImageUploadResponseDataType,
} from "types/api";

export default async function handler(
  req: NextApiRequest & ImageUploadRequestDataType,
  res: NextApiResponse<ImageUploadResponseDataType>
) {
  const { fullImageSrc, name, imageId } = req?.body?.fileData;
  if (!fullImageSrc || !name || !imageId) {
    res.status(200).json({
      error: '"fullImageSrc", "name" and "imageId is needed',
    });
  }
  const originalFilePath = `images/${name}`;
  const thumbnailFilePath = `images/thumb_${name}`;
  const buff = Buffer.from(fullImageSrc.split(",").pop(), "base64");
  // save original file
  writeFileSync(`public/${originalFilePath}`, buff);
  // generate thumbnail
  await sharp(`public/${originalFilePath}`)
    .resize(300, 300)
    .toFile(`public/${thumbnailFilePath}`);

  res.status(200).json({
    imageData: {
      imageId,
      name,
      fullImageSrc: `/${originalFilePath}`,
      thumbnailSrc: `/${thumbnailFilePath}`,
    },
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
