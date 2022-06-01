import { RouterView } from "features/router";
import { allRoutes } from "routes";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import { ModalsProvider } from "features/modal";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "features/misc";

function App() {
  return (
    <ErrorBoundary>
      <SWRConfig
        value={{ errorRetryInterval: 10000, revalidateOnFocus: false }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ModalsProvider>
              <RouterView routes={allRoutes} />
            </ModalsProvider>
          </BrowserRouter>
          <CssBaseline />
          <ToastContainer position="bottom-right" />
        </ThemeProvider>
      </SWRConfig>
    </ErrorBoundary>
  );
}

export default App;
