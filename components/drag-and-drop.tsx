import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import dragAndDropStyles from "styles/components/drag-and-drop.module.scss";
import { DragAndDropProps } from "types/components";

export const DragAndDrop = ({ onImageDrop }: DragAndDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          reader.result &&
            onImageDrop({
              fullImageSrc: reader.result as string,
              name: `${uuidv4()}_${file?.name.replaceAll(" ", "_")}`,
            });
        };
        reader.readAsDataURL(file);
      });
    },
    [onImageDrop]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const item = event.clipboardData?.items[0];
      if (item?.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = () => {
          reader.result &&
            onImageDrop({
              fullImageSrc: reader.result as string,
              name: `${uuidv4()}_${file?.name.replaceAll(" ", "_")}`,
            });
        };
        file && reader.readAsDataURL(file);
      }
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [onImageDrop]);

  return (
    <div {...getRootProps()} className={dragAndDropStyles.DragAndDrop}>
      <input {...getInputProps()} />
      <div
        className={classNames(
          dragAndDropStyles.NoImage,
          isDragActive && dragAndDropStyles.DragActive
        )}
      >
        <ContentCopyIcon sx={{ fontSize: 60 }} />
        <Typography variant="h5" gutterBottom component="div">
          Przeciągnij plik na to pole
        </Typography>
        <Typography variant="subtitle1">lub</Typography>
        <Typography variant="h5">wklej prosto ze schowka</Typography>
      </div>
    </div>
  );
};
