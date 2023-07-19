import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { todosApi } from "../../app/services/todosApi";
import { Todo } from "../../types";

interface InitialState {
  todos: Todo[] | null;
}

const initialState: InitialState = {
  todos: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todosApi.endpoints.getAllTodos.matchFulfilled,
      (state, action) => {
        state.todos = action.payload;
      }
    );
  },
});

export default todosSlice.reducer;

export const selectTodos = (state: RootState) => state.todos;
