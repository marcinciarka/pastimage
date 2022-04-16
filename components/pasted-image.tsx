import { FC, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/system";
import classNames from "classnames";
import pastedImageStyles from "styles/components/pasted-image.module.scss";
import { uploadFile } from "api";
import { PastedImageProps } from "types/image";

export const PastedImage: FC<PastedImageProps> = ({
  imageId,
  name,
  fullImageSrc,
  uploaded,
  onUploadEnd,
}) => {
  const {
    palette: { text },
  } = useTheme();
  useEffect(() => {
    if (!uploaded) {
      uploadFile({
        imageId,
        fullImageSrc,
        name,
      }).then((uploadResponse) => {
        if (uploadResponse.data.error) {
          console.error(uploadResponse.data.error);
          return;
        }
        onUploadEnd(uploadResponse.data.imageData);
      });
    }
  }, [uploaded, fullImageSrc, name, onUploadEnd, imageId]);
  return (
    <div className={pastedImageStyles.PastedImageWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fullImageSrc}
        alt={`Obrazek - ${name}`}
        className={classNames(
          uploaded
            ? pastedImageStyles.ImageInactive
            : pastedImageStyles.ImageActive
        )}
      />
      <div
        className={classNames(
          pastedImageStyles.Loader,
          uploaded
            ? pastedImageStyles.LoaderInactive
            : pastedImageStyles.LoaderActive
        )}
      >
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
};
