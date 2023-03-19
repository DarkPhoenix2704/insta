import React, { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AuthProvider } from "@app/context";
import "@fontsource/roboto";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/logo.png" />
      </Head>
      <DefaultSeo
        title="Instant!!"
        description="Instant!! is a social media platform that allows users to share their thoughts and ideas with the world."
        openGraph={{
          type: "website",
          siteName: "Instant!!",
          locale: "en_IE",
          url: "https://instant-media.vercel.app/",
        }}
      />
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ChakraProvider>
  );
};
export default MyApp;
