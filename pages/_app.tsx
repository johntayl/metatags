import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { ScriptProps } from "next/script";
import { NextPage } from "next";

import "../styles/globals.css";
import Head from "next/head";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Meta Tag Preview</title>
        <meta name="description" content="Meta Tag Preview" />
        <meta name="keywords" content="Meta Tag Preview" />
        <meta name="author" content="John Taylor" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Meta Tag Preview" />
        <meta property="og:description" content="Meta Tag Preview" />
        <meta
          property="og:image"
          content="https://meta.johntaylor.me/images/meta-tags.jpg"
        />
        <meta property="og:url" content="https://meta.johntaylor.me" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Meta Tag Preview" />

        <meta property="twitter:title" content="Meta Tag Preview" />
        <meta property="twitter:description" content="Meta Tag Preview" />
        <meta
          property="twitter:image"
          content="https://meta.johntaylor.me/images/meta-tags.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@johntayl" />
        <meta property="twitter:creator" content="@johntayl" />
      </Head>

      <div className="p-4 border-b-2">
        <h1 className="text-3xl font-bold">Meta Tags</h1>
      </div>

      <div className="content">{children}</div>
    </>
  );
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;