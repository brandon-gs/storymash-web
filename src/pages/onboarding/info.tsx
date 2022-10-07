import {
  OnboardingInfoForm,
  OnboardingSteps,
} from "@/modules/Onboarding/components";
import { Container } from "@mui/material";
import Head from "next/head";

function OnboardingInfoPage() {
  return (
    <>
      <Head>
        <title>Completa tu información personal | Storymash</title>
      </Head>
      <OnboardingSteps activeStep={0} />
      <Container maxWidth="sm" sx={{ pb: 2, pt: 2, minWidth: 300 }}>
        <OnboardingInfoForm />
      </Container>
    </>
  );
}
export default OnboardingInfoPage;
