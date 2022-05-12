import { ImageObjectType } from "./api";

export type DragAndDropProps = {
  onImageDrop: ({
    fullImageSrc,
    name,
  }: Pick<ImageObjectType, "fullImageSrc" | "name">) => void;
};

export type LoginDialogProps = {
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  loginDialogOpen: boolean;
};
