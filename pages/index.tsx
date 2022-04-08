import type { NextPage } from "next";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Header,
  DragAndDrop,
  PastedImage,
  TabPanel,
} from "components";

type ImageObjectType = {
  id: string;
  src: string;
  uploaded: boolean;
};

const MainPage: NextPage = () => {
  const [imagesList, addImage] = useState<ImageObjectType[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const updateTempImagesList = (image: string) => {
    addImage((currentImages) => [
      { id: uuidv4(), src: image, uploaded: false },
      ...currentImages,
    ]);
  };
  const handleTabChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setCurrentTab(newValue);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <DragAndDrop onImageDrop={updateTempImagesList} />
          <Box sx={{ width: "100%", marginTop: 5 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Wszystkie obrazki" />
                <Tab label={`Twoje obrazki (${imagesList.length})`} />
              </Tabs>
            </Box>
            <TabPanel value={currentTab} index={0}>
              Wszystkie obrazki
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              <ImageList
                variant="masonry"
                cols={5}
                gap={20}
                sx={{ overflow: "visible" }}
              >
                {imagesList &&
                  imagesList.map(({ id, src, uploaded }) => (
                    <ImageListItem key={id} sx={{ textAlign: "center" }}>
                      <PastedImage src={src} uploaded={uploaded} />
                    </ImageListItem>
                  ))}
              </ImageList>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
