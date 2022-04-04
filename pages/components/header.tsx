import { FC } from "react";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useTheme } from "@mui/system";

export const Header: FC = () => {
  const {
    palette: { text },
  } = useTheme();

  return (
    <>
      <Head>
        <title>pastimage 🤌 🍝</title>
      </Head>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        align="center"
        color={text.primary}
        sx={{
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <DinnerDiningIcon
          sx={{
            fontSize: 45,
            position: "relative",
            marginBottom: -1,
            overflow: "visible",
            fill: text.primary,
          }}
        />
        pastimage
      </Typography>
    </>
  );
};
