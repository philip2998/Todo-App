import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { listenerMiddleware } from "../middleware/auth";
import { api } from "./services/api";
import auth from "../features/auth/authSlice";
import todos from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    todos,
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
