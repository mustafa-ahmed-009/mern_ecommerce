import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "./UserModel";
import { AuthService } from "./AuthService";

interface AuthState {
  user: UserModel | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(AuthService.login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AuthService.login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(AuthService.login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Register cases
      .addCase(AuthService.register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AuthService.register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(AuthService.register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Check Auth cases
      .addCase(AuthService.checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AuthService.checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // The payload is already the user object without password
        state.isAuthenticated = true;
      })
      .addCase(AuthService.checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Add logout cases
      .addCase(AuthService.logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AuthService.logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(AuthService.logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;