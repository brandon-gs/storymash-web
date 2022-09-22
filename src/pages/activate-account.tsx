import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Avatar,
  Grid,
  Container,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { ButtonBack } from "@/core/components";
import { useIntervalCounter } from "@/core/hooks";
import { useResendActivationCodeMutation } from "@/modules/Auth/services";
import { useGetUserAccountQuery } from "@/core/services/User/userApi";
import { formatSeconds } from "@/core/utils";
import { IRateLimitError } from "@/core/interfaces";

const ActivateAccountPage = () => {
  // TODO: Add logic to redirect to index page if there isn't an email in redux store

  const { data: user, isLoading, isFetching } = useGetUserAccountQuery();
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  const [resendActivationCode, { isSuccess }] =
    useResendActivationCodeMutation();

  const { time, reset, saveTime } = useIntervalCounter({
    id: "send_email_activation",
    type: "decrement",
    initial: 0,
    min: 0,
    resetFrom: 60,
    max: 60,
  });

  const handleResendEmail = async () => {
    try {
      setSendingEmail(() => true);
      await resendActivationCode().unwrap();
    } catch (_error) {
      const error = _error as IRateLimitError;
      if (error.status === 429) {
        saveTime(error.data.timeRemain);
        reset(error.data.timeRemain);
      }
    } finally {
      setSendingEmail(() => false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (isSuccess && mounted) {
      saveTime();
      reset();
    }
    return () => {
      mounted = false;
    };
  }, [reset, saveTime, isSuccess]);

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
                {user === undefined ? (
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                ) : (
                  <Typography
                    component="span"
                    fontWeight="bold"
                    color="primary.dark"
                  >
                    {user.account.email}
                  </Typography>
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <LoadingButton
                variant="contained"
                size="large"
                onClick={handleResendEmail}
                loading={isLoading || isFetching || sendingEmail}
                disabled={time !== 0 || user === undefined}
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
                  alert("Should logout and clear the session (cookies)")
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
