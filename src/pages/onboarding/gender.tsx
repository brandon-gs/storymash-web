import {
  OnboardingGender,
  OnboardingSteps,
} from "@/modules/Onboarding/components";
import { Container } from "@mui/material";
import Head from "next/head";

function ProfileGender() {
  return (
    <>
      <Head>
        <title>Seleccionar género | Storymash</title>
      </Head>
      <OnboardingSteps activeStep={1} />
      <Container maxWidth="sm" sx={{ pb: 2, pt: 2, minWidth: 360 }}>
        <OnboardingGender />
      </Container>
    </>
  );
}
export default ProfileGender;
