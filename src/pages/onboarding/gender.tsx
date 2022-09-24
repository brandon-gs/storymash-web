import { OnboardingGender } from "@/modules/Onboarding/components";
import { Container } from "@mui/material";
import Head from "next/head";

function ProfileGender() {
  return (
    <>
      <Head>
        <title>Seleccionar género | Storymash</title>
      </Head>
      <Container
        maxWidth="sm"
        sx={{ pb: 2, pt: 5, height: "100%", minWidth: 360 }}
      >
        <OnboardingGender />
      </Container>
    </>
  );
}
export default ProfileGender;
