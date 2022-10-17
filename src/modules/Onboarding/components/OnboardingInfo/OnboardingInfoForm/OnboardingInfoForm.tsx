import { FormInput, FormInputDate } from "@/core/components";
import { useListenInputErrors } from "@/core/hooks";
import { useOnboardingUpdateInfoMutation } from "@/modules/Onboarding/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  IOnboardingInfoFormSchema,
  onboardingInfoFormSchema,
} from "./OnboardingInfoFormSchema";

function OnboardingInfoForm() {
  const [updateInfo, { isLoading, error }] = useOnboardingUpdateInfoMutation();

  const methods = useForm<IOnboardingInfoFormSchema>({
    resolver: zodResolver(onboardingInfoFormSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    setError,
    formState: { isValid },
  } = methods;

  const onSubmitHandler: SubmitHandler<IOnboardingInfoFormSchema> = (
    values
  ) => {
    updateInfo(values);
  };

  useListenInputErrors<IOnboardingInfoFormSchema>(error, setError);

  return (
    <Grid container component="main" justifyContent={"center"}>
      <Box
        sx={{
          my: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            COMPLETA LA INFORMACIÓN
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography component="p" color="gray">
            Llena el formulario con la información necesaria para continuar
          </Typography>
        </Grid>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
          >
            <Stack spacing={3}>
              <FormInput
                name="firstname"
                label="Nombre(s)"
                autoFocus
                sx={{ minWidth: 296, maxWidht: 296 }}
              />
              <FormInput name="lastname" label="Apellido(s)" />
              <FormInputDate name="birthdate" label="Día de nacimiento" />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid}
                loading={isLoading}
              >
                <Typography>Continuar</Typography>
              </LoadingButton>
            </Stack>
          </Box>
        </FormProvider>
      </Box>
    </Grid>
  );
}
export default OnboardingInfoForm;
