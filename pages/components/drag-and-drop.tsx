import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { PastedImage } from "pages/components";
import dragAndDropStyles from "styles/components/drag-and-drop.module.scss";

type DragAndDropProps = {
  onImageDrop: (t: string) => void;
  imagesList?: string[];
};

export const DragAndDrop = ({ onImageDrop, imagesList }: DragAndDropProps) => {
  const {
    palette: { text },
  } = useTheme();
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          reader.result && onImageDrop(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    },
    [onImageDrop]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    document.addEventListener("paste", (event) => {
      var item = event.clipboardData?.items[0];

      if (item?.type.indexOf("image") === 0) {
        var blob = item.getAsFile();

        var reader = new FileReader();
        reader.onload = () => {
          reader.result && onImageDrop(reader.result as string);
        };

        blob && reader.readAsDataURL(blob);
      }
    });
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
        <ContentCopyIcon sx={{ fontSize: 60, fill: text.primary }} />
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          color={text.secondary}
        >
          Przeciągnij plik na to pole
        </Typography>
        <Typography variant="subtitle1" color={text.secondary}>
          lub
        </Typography>
        <Typography variant="h5" color={text.secondary}>
          wklej prosto ze schowka
        </Typography>
      </div>
      {imagesList &&
        imagesList.map((image) => <PastedImage key={uuidv4()} src={image} />)}
    </div>
  );
};
