import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/authApi";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }

    if (action.payload.data.user.id) {
      localStorage.setItem("userId", action.payload.data.user.id);
    }
  },
});
