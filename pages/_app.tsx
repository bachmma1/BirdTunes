import type { AppProps } from "next/app";
import Head from "next/head";
import { ModalProvider } from "contexts/ModalContext";
import Script from "next/script";

import "/styles/index.scss";
import { useIsLocalhost } from "hooks/useIsLocalhost";

export default function App({ Component, pageProps }: AppProps) {
  const isLocalhost = useIsLocalhost();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#314023" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="BirdTunes" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>

      {/* Skip tracking for localhost/dev */}
      {!isLocalhost && (
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="fb88d8e1-5cd5-4760-b4ea-378c12c6301c"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
