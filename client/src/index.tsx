import React from "react";

import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Paths } from "./paths";

import Login from "./pages/common/login/Login";
import Signup from "./pages/common/signup/Signup";
import UserTodos from "./pages/common/todos/Todos";
import AddTodo from "./pages/common/addTodo/AddTodo";
import EditUser from "./pages/common/editUser/EditUser";
import User from "./pages/common/user/User";

import AppUsers from "./pages/admin/appUsers/AppUsers";
import AppTodos from "./pages/admin/appTodos/AppTodos";
// import CreateUser from "./pages/admin/createUser/CreateUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

const router = createBrowserRouter([
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
    path: `${Paths.userTodos}/:id`,
    element: <UserTodos />,
  },
  {
    path: Paths.createUser,
    element: <Signup />,
  },
  {
    path: Paths.allUsers,
    element: <AppUsers />,
  },
  {
    path: Paths.allTodos,
    element: <AppTodos />,
  },
  {
    path: `${Paths.user}/:id`,
    element: <User />,
  },
  {
    path: `${Paths.userEdit}/:id`,
    element: <EditUser />,
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
