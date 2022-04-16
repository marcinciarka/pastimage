export type ImageObjectType = {
  imageId: string;
  name: string;
  fullImageSrc: string;
  thumbnailSrc?: string;
  uploaded?: boolean;
};

export type ImageUploadRequestDataType = {
  body: {
    imageData: ImageObjectType;
  };
};

export type ImageUploadResponseDataType =
  | {
      error: string;
    }
  | {
      imageData: ImageObjectType;
    };
