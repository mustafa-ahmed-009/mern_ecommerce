import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const UserService = {
    checkAuth: createAsyncThunk(
        "user/checkAuth",
        async (_, { rejectWithValue }) => {
          try {
            const response = await axiosInstance.get("auth/check");
            return response.data;
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message || error.response.data);
            }
            return rejectWithValue(error.message);
          }
        }
      ),
}