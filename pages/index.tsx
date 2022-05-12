import type { NextPage } from "next";
import { Grid, Box, Tab, Tabs, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Header,
  DragAndDrop,
  PastedImage,
  TabPanel,
} from "components";
import { ImageObjectType } from "types/api";
import { DragAndDropProps } from "types/components";

const MainPage: NextPage = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const openLoginDialog = () => setLoginDialogOpen(true);
  const closeLoginDialog = () => setLoginDialogOpen(false);

  const [imagesList, setImageList] = useState<ImageObjectType[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const onUploadEnd = (uploadedImage: ImageObjectType) => {
    const { imageId: uploadedImageId } = uploadedImage;
    const uploadedImageIndex = imagesList.findIndex(
      ({ imageId }) => imageId === uploadedImageId
    );
    if (uploadedImageIndex < 0) {
      console.error("Wrong image id");
    }
    setImageList((currentImages) => {
      currentImages[uploadedImageIndex] = {
        ...uploadedImage,
        uploaded: true,
      };
      return [...currentImages];
    });
  };
  const updateImagesList: DragAndDropProps["onImageDrop"] = ({
    fullImageSrc,
    name,
  }) => {
    setImageList((currentImages) => [
      { imageId: uuidv4(), fullImageSrc, name, uploaded: false },
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
          <Header
            openLoginDialog={openLoginDialog}
            closeLoginDialog={closeLoginDialog}
            loginDialogOpen={loginDialogOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <DragAndDrop onImageDrop={updateImagesList} />
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
                  imagesList.map(
                    ({
                      imageId,
                      fullImageSrc,
                      thumbnailSrc,
                      name,
                      uploaded,
                    }) => (
                      <ImageListItem key={imageId} sx={{ textAlign: "center" }}>
                        <PastedImage
                          imageId={imageId}
                          fullImageSrc={
                            thumbnailSrc ? thumbnailSrc : fullImageSrc
                          }
                          name={name}
                          uploaded={uploaded}
                          onUploadEnd={onUploadEnd}
                        />
                      </ImageListItem>
                    )
                  )}
              </ImageList>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
