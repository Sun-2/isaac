import React from "react";
import Head from "next/head";
import { GlobalStyles } from "../../../../x/fake-notification/website2/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme/default";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { PopupContainer } from "../components/PopupContainer";

function MyApp({ Component, pageProps }) {
  const component = Component.layout ? (
    <Component.layout>
      <Component {...pageProps} />
    </Component.layout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {component}
          <PopupContainer />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
