import { FC } from "react";
import pastedImageStyles from "styles/components/pasted-image.module.scss";

type PastedImageProps = {
  src: string;
};

export const PastedImage: FC<PastedImageProps> = ({ src }) => (
  <div className={pastedImageStyles.PastedImageWrapper}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt="Wklejony obrazek" />
  </div>
);
