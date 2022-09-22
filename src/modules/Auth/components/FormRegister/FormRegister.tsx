import { useEffect } from "react";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCheckbox, FormInput, Link } from "@/core/components";
import { registerSchema, TRegisterSchema } from "./registerSchema";
import { useRegisterMutation } from "../../services";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { IRegisterErrorFields, selectActivateEmailErrors } from "../../store";

function FormRegister() {
  const dispatch = useAppDispatch();
  const formErrors = useAppSelector(selectActivateEmailErrors);
  const [register, { isLoading }] = useRegisterMutation();

  const methods = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const {
    // reset,
    handleSubmit,
    setError,
  } = methods;

  const onSubmitHandler: SubmitHandler<TRegisterSchema> = (values) => {
    register(values);
  };

  // Show errors from redux state
  useEffect(() => {
    for (const field in formErrors) {
      const fieldName = field as IRegisterErrorFields;
      if (typeof formErrors[fieldName] === "string") {
        setError(fieldName, { message: formErrors[fieldName] });
      }
    }
  }, [dispatch, setError, formErrors]);

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
          Crear cuenta
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
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
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
            />
            <FormInput
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormInput
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirmar contraseña"
              type="password"
              id="passwordConfirm"
            />
            <FormCheckbox
              name="terms"
              label="Acepto los términos y condiciones"
              color="primary.main"
            />
            <LoadingButton
              variant="contained"
              fullWidth
              type="submit"
              loading={isLoading}
              sx={{ mt: "1rem", mb: "1.2rem", py: "0.8rem" }}
            >
              <Typography>Crear cuenta</Typography>
            </LoadingButton>
            <Grid container>
              <Grid item xs={12}>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ float: "right", pb: "0.8rem" }}
                >
                  {"¿Ya tienes una cuenta? Inicia sesión"}
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link href="#" variant="body2">
                  {"¿Olvidaste tu contraseña?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Box>
    </Grid>
  );
}
export default FormRegister;
