import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axios";

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const AuthService = {
  login: createAsyncThunk(
    "auth/login",
    async (params: LoginParams, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("auth/login", params);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(
            error.response.data.message || error.response.data,
          );
        }
        return rejectWithValue(error.message);
      }
    },
  ),

  register: createAsyncThunk(
    "auth/register",
    async (params: RegisterParams, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("auth/signup", params);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(
            error.response.data.message || error.response.data,
          );
        }
        return rejectWithValue(error.message);
      }
    },
  ),
  checkAuth: createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("auth/check");
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(
            error.response.data.message || error.response.data,
          );
        }
        return rejectWithValue(error.message);
      }
    },
  ),
  logout: createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/logout");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || error.response.data,
        );
      }
      return rejectWithValue(error.message);
    }
  }),
};
