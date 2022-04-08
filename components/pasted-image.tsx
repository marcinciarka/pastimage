import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/system";
import classNames from "classnames";
import pastedImageStyles from "styles/components/pasted-image.module.scss";

type PastedImageProps = {
  src: string;
  uploaded: boolean;
};

export const PastedImage: FC<PastedImageProps> = ({ src, uploaded }) => {
  const {
    palette: { text },
  } = useTheme();
  return (
    <div className={pastedImageStyles.PastedImageWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Wklejony obrazek"
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
