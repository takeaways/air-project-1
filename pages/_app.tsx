import type { AppProps } from "next/app";
import { SWRConfig, SWRConfiguration } from "swr";

import "../styles/globals.css";

const fetcher = (url: string) => {
  return fetch(url).then((response) => response.json());
};

const swrConfig: SWRConfiguration = {
  fetcher,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={swrConfig}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
