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
        variant="h1"
        component="div"
        gutterBottom
        align="center"
        color={text.primary}
      >
        <DinnerDiningIcon
          style={{
            position: "relative",
            width: 70,
            height: 70,
            marginBottom: -7,
            overflow: "visible",
            fill: text.primary,
          }}
        />
        pastimage
      </Typography>
    </>
  );
};
