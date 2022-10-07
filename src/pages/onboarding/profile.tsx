import {
  OnboardingProfile,
  OnboardingSteps,
} from "@/modules/Onboarding/components";
import { Container } from "@mui/material";
import Head from "next/head";

const OnboardingProfilePage = () => {
  return (
    <>
      <Head>
        <title>Completa tu perfil | Storymash</title>
      </Head>
      <OnboardingSteps activeStep={2} />
      <Container maxWidth="sm" sx={{ pb: 2, pt: 2, minWidth: 300 }}>
        <OnboardingProfile />
      </Container>
    </>
  );
};
export default OnboardingProfilePage;
