import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Zoom,
} from "@mui/material";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { Field, Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import { LoginDialogProps } from "types/components";
import { Box } from "@mui/system";
import { AddBox } from "@mui/icons-material";

interface LoginValues {
  username: string;
  password: string;
}

const LoginDialog = ({
  openLoginDialog,
  closeLoginDialog,
  loginDialogOpen,
  csrfToken,
}: LoginDialogProps & { csrfToken: string }) => {
  return (
    <>
      {/* TODO: get rid of the float */}
      <Button
        size="large"
        variant="outlined"
        style={{ float: "right" }}
        onClick={openLoginDialog}
      >
        zaloguj
      </Button>
      <Dialog
        open={loginDialogOpen}
        TransitionComponent={Zoom}
        keepMounted
        onClose={closeLoginDialog}
        maxWidth="lg"
      >
        <DialogTitle>Zaloguj się</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Użyj danych logowania LDAP.
          </DialogContentText>
          <Formik
            initialValues={{
              username: "user",
              password: "password",
              csrfToken,
            }}
            onSubmit={async (values: LoginValues) => {
              console.log("values", values);

              await signIn("LDAP", {
                redirect: false,
                username: values.username,
                password: values.password,
              });
            }}
          >
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Field name="csrfToken" type="hidden" />
                <TextField
                  name="username"
                  label="Login"
                  sx={{
                    marginRight: 1,
                    marginTop: 1,
                  }}
                  required
                  fullWidth
                />
                <TextField
                  type="password"
                  name="password"
                  label="Hasło"
                  sx={{
                    marginLeft: 1,
                    marginTop: 1,
                  }}
                  required
                  fullWidth
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Zaloguj
              </Button>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export { LoginDialog };
