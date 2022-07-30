import "../styles/globals.css";
import "antd/dist/antd.css";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { Provider } from "react-redux";
// import store from "store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // disabling caching and background reloading during testing
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
