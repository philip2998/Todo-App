import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { listenerMiddleware } from "../middleware/auth";
import { api } from "./services/api";

import todos from "../features/todos/todosSlice";
import users from "../features/users/usersSlice";
import auth from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    todos,
    users,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
