import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Auth/data/UserModel";
import { AuthService } from "../Auth/data/AuthService";
import { UserService } from "./UserService";


interface UserState {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // Check Auth cases
      .addCase(UserService.checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserService.checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // The payload is already the user object without password
      })
      .addCase(UserService.checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export const userReducer = userSlice.reducer;