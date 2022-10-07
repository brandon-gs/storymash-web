import { UserGender } from "@/core/interfaces";
import { useOnboardingUpdateGenderMutation } from "@/core/services";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { type FC } from "react";
import OnboardingOptionGender from "./OnboardingOptionGender/OnboardingOptionGender";
import useOnboardingGender from "./useOnboardingGender";

const OnboardingGender: FC = () => {
  const [updateGender, { isLoading }] = useOnboardingUpdateGenderMutation();

  const {
    gender,
    customGender,
    disableButton,
    handleChangeCustomGender,
    handleSelectGender,
  } = useOnboardingGender();

  const handleUpdateGender = () => {
    const currentGender = gender === UserGender.other ? customGender : gender;
    updateGender({ gender: currentGender });
  };

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
            GÉNERO
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography component="p" color="gray">
            Selecciona una opción para continuar
          </Typography>
        </Grid>
        <Grid container spacing={1} sx={{ mb: 4 }}>
          <Grid item>
            <OnboardingOptionGender
              imageUrl={process.env.NEXT_PUBLIC_GENDER_MALE_IMAGE}
              label="Hombre"
              onClick={handleSelectGender(UserGender.male)}
              isSelected={gender === UserGender.male}
            />
          </Grid>
          <Grid item>
            <OnboardingOptionGender
              imageUrl={process.env.NEXT_PUBLIC_GENDER_FEMALE_IMAGE}
              label="Mujer"
              onClick={handleSelectGender(UserGender.female)}
              isSelected={gender === UserGender.female}
            />
          </Grid>
          <Grid item>
            <OnboardingOptionGender
              imageUrl={process.env.NEXT_PUBLIC_GENDER_OTHER_IMAGE}
              label="Otro"
              onClick={handleSelectGender(UserGender.other)}
              isSelected={gender === UserGender.other}
            />
          </Grid>
        </Grid>
        {gender === UserGender.other && (
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Género"
              name="other_gender"
              value={customGender}
              onChange={handleChangeCustomGender}
            />
          </Grid>
        )}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <LoadingButton
            variant="contained"
            size="large"
            onClick={handleUpdateGender}
            loading={isLoading}
            disabled={disableButton}
          >
            <Typography component="span">Continuar</Typography>
          </LoadingButton>
        </Grid>
      </Box>
    </Grid>
  );
};
export default OnboardingGender;
