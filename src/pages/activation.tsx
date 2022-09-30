import { useActivateAccountMutation } from "@/modules/Auth/services";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

function Activation() {
  const router = useRouter();

  const [activateAccount, { isError, error }] = useActivateAccountMutation();

  const hasApiError = useMemo(() => {
    return error !== undefined && "data" in error;
  }, [error]);

  useEffect(() => {
    const code = router.query.code;
    if (typeof code === "string") {
      activateAccount({ code });
    }
  }, [activateAccount, router.query.code]);

  return (
    <>
      <Head>
        <title>Activar cuenta | Storymash</title>
      </Head>

      <Container maxWidth="sm" sx={{ pb: 2, pt: 5, height: "100%" }}>
        <Grid container component="main" justifyContent="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Grid item xs={12} alignItems="center">
              {!isError ? (
                <CircularProgress thickness={4} sx={{ m: 1 }} />
              ) : (
                <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
                  <ErrorOutlineOutlined />
                </Avatar>
              )}
              {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <Pending />
              </Avatar> */}
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography component="h1" variant="h5" fontWeight="bold">
                {error && "data" in error && "message" in error.data
                  ? error.data.message
                  : "Activando cuenta"}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Typography component="p" color="gray">
                {hasApiError
                  ? "Por favor revisa el link que enviamos a tu correo electrónico"
                  : "Estamos activando tu cuenta, espera unos momentos"}
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
export default Activation;
