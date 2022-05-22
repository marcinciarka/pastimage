import { FC } from "react";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { Typography, Grid } from "@mui/material";
import Head from "next/head";
import { LoginDialog } from "./login-dialog";
import { LoginDialogProps } from "types/components";

export const Header: FC<LoginDialogProps> = ({
  openLoginDialog,
  closeLoginDialog,
  loginDialogOpen,
}) => (
  <>
    <Head>
      <title>pastimage 🤌 🍝</title>
    </Head>
    {/* <Grid container spacing={2} alignContent="center"> */}
    <Grid container spacing={2} marginY={1}>
      <Grid item xs={6} alignSelf="center">
        <Typography variant="h4" component="div" gutterBottom>
          <DinnerDiningIcon
            sx={{
              fontSize: 45,
              position: "relative",
              marginBottom: -1,
              overflow: "visible",
            }}
          />
          pastimage
        </Typography>
      </Grid>
      <Grid item xs={6} alignSelf="center">
        <LoginDialog
          openLoginDialog={openLoginDialog}
          closeLoginDialog={closeLoginDialog}
          loginDialogOpen={loginDialogOpen}
        />
      </Grid>
    </Grid>
  </>
);
