import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type DragAndDropProps = {
  onImageDrop: (t: string) => void;
  image?: string;
};

export const DragAndDrop = ({ onImageDrop, image }: DragAndDropProps) => {
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
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {image ? (
        <Image
          src={image}
          alt="Wklejony obrazek"
          layout="responsive"
          width={100}
          height={100}
        />
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
};
