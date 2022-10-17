import "../styles/globals.css";
import type { AppProps } from "next/app";
import { EmotionCache } from "@emotion/cache";
import Head from "next/head";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache, theme } from "@/theme";
import { CssBaseline } from "@mui/material";
import { persistor, store } from "@/core/store";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "@/core/utils";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
          </Head>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <SnackbarUtilsConfigurator />
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
