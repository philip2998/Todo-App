import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../types";
import { usersApi } from "../../app/services/usersApi";
import { RootState } from "../../app/store";

interface InitialState {
  users: UserData[] | null;
}

const initialState: InitialState = {
  users: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getAllUsers.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      }
    );
  },
});

export default usersSlice.reducer;

export const selectUsers = (state: RootState) => state.users;
