import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserData } from "../../types";
import { usersApi } from "../../app/services/usersApi";

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
