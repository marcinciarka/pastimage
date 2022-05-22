import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Zoom,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import { LoginDialogProps } from "types/components";
import { Box } from "@mui/system";

interface LoginValues {
  login?: string;
  password?: string;
  csrfToken?: string;
}

const LoginDialog = ({
  openLoginDialog,
  closeLoginDialog,
  loginDialogOpen,
  csrfToken,
}: LoginDialogProps & LoginValues) => {
  const { status, data } = useSession();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      csrfToken,
    },
    onSubmit: async (values: LoginValues) => {
      const login = await signIn("credentials", {
        redirect: false,
        login: values.login,
        password: values.password,
      });
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      closeLoginDialog();
    }
  }, [status, closeLoginDialog]);

  return (
    <>
      {/* TODO: get rid of the float */}
      {status === "authenticated" ? (
        <Button
          size="large"
          variant="outlined"
          style={{ float: "right" }}
          onClick={() => {
            signOut();
          }}
        >
          wyloguj {data?.user?.fullName}
        </Button>
      ) : (
        <LoadingButton
          size="large"
          variant="outlined"
          style={{ float: "right" }}
          loading={status === "loading"}
          onClick={openLoginDialog}
        >
          zaloguj
        </LoadingButton>
      )}
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
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextField
                name="csrfToken"
                type="hidden"
                style={{ display: "none" }}
              />
              <TextField
                id="login"
                name="login"
                label="Login"
                sx={{
                  marginRight: 1,
                  marginTop: 1,
                }}
                required
                fullWidth
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
              <TextField
                type="password"
                id="password"
                name="password"
                label="Hasło"
                sx={{
                  marginLeft: 1,
                  marginTop: 1,
                }}
                required
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
          </form>
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
