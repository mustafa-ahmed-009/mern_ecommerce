import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../utils/axios";

export const BrandsService = {
  fetchAllBrands: createAsyncThunk(
    "brands/fetchAll",
    async (params: { page?: number; limit?: number }, { rejectWithValue }) => {
      try {
        const { page, limit } = params;
        const response = await axiosInstance.get("brands", {
          params: {
            limit,
            page,
          },
        });
        return response.data;
      } catch (error: any) {
        // Extract the error message from the response data
        if (error.response && error.response.data) {
          return rejectWithValue(
            error.response.data.message || error.response.data,
          );
        }
        return rejectWithValue(error.message);
      }
    },
  ),

  createBrand: createAsyncThunk(
    "brands/create",
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("brands", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        });
        return response.data; // Return the created category
      } catch (error: any) {
        // Extract the error message from the response data
        if (error.response && error.response.data) {
          return rejectWithValue(
            error.response.data.message || error.response.data,
          );
        }
        return rejectWithValue(error.message);
      }
    },
  ),

  deleteBrand: createAsyncThunk(
    "brands/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`brands/${id}`);
        return id; // Return the deleted category ID
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

  update: createAsyncThunk(
    "brands/update",
    async (
      { id, formData }: { id: string; formData: FormData },
      { rejectWithValue },
    ) => {
      try {
        console.log("Updating brand with ID:", id);
        console.log("FormData contents (from service):");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        const response = await axiosInstance.put(`brands/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data.data; // Return the updated category
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
};
