import Head from "next/head";
import { Avatar, Grid, Container, Typography, Box } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { ButtonBack } from "@/core/components";
import { LoadingButton } from "@mui/lab";
import { useIntervalCounter } from "@/core/hooks";
import formatSeconds from "@/core/utils/dates";

const ActivateAccountPage = () => {
  // TODO: Add logic to redirect to index page if there isn't an email in redux store

  const { time, reset, saveTime } = useIntervalCounter({
    id: "send_email_activation",
    type: "decrement",
    initial: 0,
    min: 0,
    resetFrom: 60,
    max: 60,
    onMinReached: () => {
      alert("min reached");
    },
  });

  const handleResendEmail = () => {
    saveTime();
    reset();
  };

  return (
    <>
      <Head>
        <title>Storymash | Activar cuenta</title>
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
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <EmailIcon />
              </Avatar>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography component="h1" variant="h5" fontWeight="bold">
                Consulta tu correo electrónico
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Typography component="p" color="gray">
                Hemos enviado un link para activar tu cuenta a: <br />
                <Typography
                  component="span"
                  fontWeight="bold"
                  color="primary.dark"
                >
                  {/* TODO: Show the email from redux */}
                  brandongs180@gmail.com
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <LoadingButton
                variant="contained"
                size="large"
                onClick={handleResendEmail}
                disabled={time !== 0}
              >
                <Typography component="span">
                  Reenviar link {time !== 0 ? `en  ${formatSeconds(time)}` : ""}
                </Typography>
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <ButtonBack
                message="Back to login"
                href="/"
                onClick={() =>
                  alert(
                    "Should clear the state from the email, time, etc at localstorage"
                  )
                }
              />
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
};
export default ActivateAccountPage;
