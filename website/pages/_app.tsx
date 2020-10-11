import React from "react";
import Head from "next/head";
import {GlobalStyles} from "../styles/GlobalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "../styles/theme/default";

function MyApp({ Component, pageProps }) {

  const component = Component.layout ? (
    <Component.layout>
      <Component {...pageProps}/>
    </Component.layout>
  ) : (
    <Component  {...pageProps}/>
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
      <GlobalStyles/>
      {component}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
