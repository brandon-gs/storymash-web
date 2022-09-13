import { AuthLayout, FormRegister } from "@/modules/Auth/components";
import { Grid } from "@mui/material";
import Head from "next/head";

function SignUp() {
  return (
    <>
      <Head>
        <title>Storymash | Registro</title>
      </Head>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <AuthLayout>
          <FormRegister />
        </AuthLayout>
      </Grid>
    </>
  );
}
export default SignUp;
