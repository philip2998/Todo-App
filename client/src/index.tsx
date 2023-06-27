import React from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Paths } from "./paths";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Todos from "./pages/todos/Todos";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: (
      <h1>
        <Todos />
      </h1>
    ),
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.signup,
    element: <Signup />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
