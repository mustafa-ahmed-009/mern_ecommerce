import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../utils/axios";
import { Product } from "../models/ProductModel"; // Import the Product model

export const ProductsService = {
  // Fetch all products
  fetchAllProducts: createAsyncThunk(
    "products/fetchAll",
    async (params: { page?: number; limit?: number }, { rejectWithValue }) => {
      try {
        const { page, limit } = params;
        const response = await axiosInstance.get("products", {
          params: {
            limit,
            page,
          },
        });
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),

  // Create a new product
  createProduct: createAsyncThunk(
    "products/create",
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("products", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        });
        return response.data; // Return the created product
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),

  // Update a product
  updateProduct: createAsyncThunk(
    "products/update",
    async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data; // Return the updated product
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),

  // Delete a product
  deleteProduct: createAsyncThunk(
    "products/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`products/${id}`);
        return id; // Return the deleted product ID
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),
};