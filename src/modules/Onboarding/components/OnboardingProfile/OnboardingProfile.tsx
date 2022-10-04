import {
  AvatarWithSkeleton,
  FormInput,
  FormInputFileButton,
} from "@/core/components";
import { useGetUserQuery } from "@/core/services/User/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  IOnboardingProfileSchema,
  onboardingProfileSchema,
} from "./OnboardingProfileSchema";

const OnboardingProfile = () => {
  const { data: user, ...userQuery } = useGetUserQuery();

  const [hasValueToSend, setHasValueToSend] = useState<boolean>(false);
  const methods = useForm<IOnboardingProfileSchema>({
    resolver: zodResolver(onboardingProfileSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    resetField,
  } = methods;

  const onSubmitHandler: SubmitHandler<IOnboardingProfileSchema> = (values) => {
    console.log(values);
  };

  const undoImageSelected = () => {
    resetField("image");
  };

  const image = watch("image");
  const about = watch("about");
  const files = watch("image", null);
  const previewImage =
    files && files.length > 0 ? URL.createObjectURL(files[0]) : null;

  /**
   * Watch if has a value to send and enable the continue button
   */
  useEffect(() => {
    const hasImage = image !== undefined;
    const hasAbout = Boolean(about);
    setHasValueToSend(hasImage || hasAbout);
  }, [about, image]);

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <Grid container component="main" justifyContent={"center"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" fontWeight={"bold"}>
                COMPLETA TU PERFIL
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography component="p" color="gray">
                Puedes cambiar esta información más adelante
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AvatarWithSkeleton
                isLoading={userQuery.isLoading}
                alt={`${user?.account.username} image`}
                src={previewImage ?? user?.profile?.imageUrl}
                sx={{
                  width: 160,
                  height: 160,
                  mb: 1,
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Stack spacing={1}>
                <FormInputFileButton name="image" control={control} />
                <Button
                  variant="contained"
                  color="error"
                  disabled={!files || files.length === 0}
                  onClick={undoImageSelected}
                >
                  <Typography>Deshacer</Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ width: "100%", mb: 1 }}>
              <FormInput
                placeholder="Escribe sobre ti..."
                fullWidth
                name="about"
                label="Sobre ti (opcional)"
                variant="outlined"
                minRows={5}
                maxRows={5}
                multiline
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "100%", mt: 1 }}>
              <Stack direction="row" justifyContent={"flex-end"}>
                <Button variant="outlined">
                  <Typography>Omitir</Typography>
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={!isValid || !hasValueToSend}
                  sx={{ ml: 2 }}
                >
                  <Typography>Continuar</Typography>
                </LoadingButton>
              </Stack>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </FormProvider>
  );
};
export default OnboardingProfile;
