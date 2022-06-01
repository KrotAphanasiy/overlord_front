import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { fetchConfig } from "definitions";
import http from "lib/http";

import 'moment/locale/ru';

fetchConfig()
  .then((config) => { 
    http.defaults.baseURL = config.API_URL + "/api/v1/";
    console.log("Set default url:", http.defaults.baseURL);
    // @ts-ignore
    window.__http = http;
  })
  .catch((e) => {
    console.error("Load config error: ");
    console.log(e);
  })
  .finally(() =>
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    )
  );
