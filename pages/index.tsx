import type { NextPage } from "next";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "./components/container";
import { Header } from "./components/header";
import { DragAndDrop } from "./components/drag-and-drop";
import { useState } from "react";

const MainPage: NextPage = () => {
  const [image, setImage] = useState("");
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <DragAndDrop onImageDrop={setImage} image={image} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
