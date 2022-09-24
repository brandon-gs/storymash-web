import { Avatar, Box, Grid, Link, Paper, Typography } from "@mui/material";
import { type ILoginSchema, loginSchema } from "./FormLoginSchema";
import { LoadingButton } from "@mui/lab";
import { FormInput } from "@/core/components";
import { type SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLoginMutation } from "../../services";

function FormLogin() {
  const [login, { isLoading }] = useLoginMutation();

  const methods = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<ILoginSchema> = (values) => {
    login(values);
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 3,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormInput
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <FormInput
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
            >
              <Typography>Iniciar sesión</Typography>
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"¿No tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Box>
    </Grid>
  );
}
export default FormLogin;
