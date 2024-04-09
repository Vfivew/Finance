import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/";
import App from "./App";
import "./index.css";
import "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <div className="bg-main text-text p-4 h-auto min-h-screen w-full">
          <App />
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
