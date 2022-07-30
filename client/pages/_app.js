import "../styles/globals.css";
import "antd/dist/antd.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useState } from "react";

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
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

export default MyApp;
