import { createSlice } from "@reduxjs/toolkit";
import { AuthService } from "./AuthService";

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
newUserVerified: boolean 
}

const initialState: AuthState = {
  error: null,
  loading: false,
  isAuthenticated: false,
  newUserVerified:false , 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
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
      .addCase(AuthService.login.fulfilled, (state) => {
        state.loading = false;

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
      .addCase(AuthService.register.fulfilled, (state) => {
        state.loading = false;

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
      .addCase(AuthService.checkAuth.fulfilled, (state) => {
        state.loading = false;
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

        state.isAuthenticated = false;
      })
      .addCase(AuthService.logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(AuthService.verifyRegistrationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AuthService.verifyRegistrationCode.fulfilled, (state) => {
        state.loading = false;
state.newUserVerified = true ; 
      })
      .addCase(AuthService.verifyRegistrationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
