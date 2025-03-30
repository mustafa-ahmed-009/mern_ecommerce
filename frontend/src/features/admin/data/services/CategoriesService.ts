import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../utils/axios";

export const CategoriesService = {
  fetchAllCategories: createAsyncThunk(
    "categories/fetchAll",
    async (params: { page?: number; limit?: number }, { rejectWithValue }) => {
      try {
        const { page, limit } = params;
        const response = await axiosInstance.get("categories", {
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

  createCategory: createAsyncThunk(
    "categories/create",
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("categories", formData, {
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

  deleteCategory: createAsyncThunk(
    "categories/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`categories/${id}`);
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

  updateCategory: createAsyncThunk(
    "categories/update",
    async (
      { id, formData }: { id: string; formData: FormData },
      { rejectWithValue },
    ) => {
      try {
        const response = await axiosInstance.put(`categories/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data; // Return the updated category
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
