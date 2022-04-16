import { ImageObjectType } from "./api";

export type PastedImageProps = ImageObjectType & {
  onUploadEnd: (T: ImageObjectType) => void;
};
