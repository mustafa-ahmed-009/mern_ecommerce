import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../utils/axios";

export const SubCategoriesService = {
  // Fetch all subcategories
  fetchAllSubCategories: createAsyncThunk(
    "subCategories/fetchAll",
    async (params: { page?: number; limit?: number }, { rejectWithValue }) => {
      try {
        const { page, limit } = params;
        const response = await axiosInstance.get("subcategories", {
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

  // Create a new subcategory
  createSubCategory: createAsyncThunk(
    "subCategories/create",
    async (
      subCategoryData: { name: string; category: string },
      { rejectWithValue },
    ) => {
      try {
        const response = await axiosInstance.post(
          "subcategories",
          subCategoryData,
          {
            headers: {
              "Content-Type": "application/json", // JSON content type
            },
          },
        );
        return response.data; // Return the created subcategory
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

  // Delete a subcategory
  deleteSubCategory: createAsyncThunk(
    "subCategories/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`subcategories/${id}`);
        return id; // Return the deleted subcategory ID
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

  // Update a subcategory
  updateSubCategory: createAsyncThunk(
    "subCategories/update",
    async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(
          `subcategories/${id}`,
          { name }, // Only send the name as JSON
          {
            headers: {
              "Content-Type": "application/json", // JSON content type
            },
          },
        );
        return response.data; // Return the updated subcategory
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
