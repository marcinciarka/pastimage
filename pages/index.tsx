import type { NextPage } from "next";
import Grid from "@mui/material/Grid";
import { Container, Header, DragAndDrop } from "pages/components";
import { useEffect, useState } from "react";

const MainPage: NextPage = () => {
  const [imagesList, addImage] = useState<string[]>([]);
  const updateTempImagesList = (image: string) => {
    addImage((currentImages) => [image, ...currentImages]);
  };
  // useEffect(() => {

  // }, [image]);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <DragAndDrop
            onImageDrop={updateTempImagesList}
            imagesList={imagesList}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
