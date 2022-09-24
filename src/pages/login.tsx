import { AuthLayout, FormLogin } from "@/modules/Auth/components";
import { Grid } from "@mui/material";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Iniciar sesión | Storymash</title>
      </Head>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <AuthLayout>
          <FormLogin />
        </AuthLayout>
      </Grid>
    </>
  );
};
export default Login;
