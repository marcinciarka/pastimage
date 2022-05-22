import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/cache";

import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

type AppPropsType = AppProps & { emotionCache: EmotionCache };

function App(props: AppPropsType) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default App;
