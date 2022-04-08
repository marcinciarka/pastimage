import MuiContainer from "@mui/material/Container";
import { FC } from "react";

export const Container: FC = ({ children }) => (
  <MuiContainer maxWidth="lg">{children}</MuiContainer>
);
