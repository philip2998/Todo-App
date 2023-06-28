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
import AddTodo from "./pages/addTodo/AddTodo";
import Status from "./pages/status/Status";
import Todo from "./pages/todo/Todo";
import EditTodo from "./pages/editTodo/EditTodo";

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
  {
    path: Paths.todoAdd,
    element: <AddTodo />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.todo}/:id`,
    element: <Todo />,
  },
  {
    path: `${Paths.todoEdit}/:id`,
    element: <EditTodo />,
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
