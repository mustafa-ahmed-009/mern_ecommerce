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
          return rejectWithValue(
            error.response.data.message || error.response.data,
          );
        }
        return rejectWithValue(error.message);
      }
    },
  ),

  searchInProducts: createAsyncThunk(
    "products/search",
    async (searchKeyWord: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("products", {
          params: {
            keyword: searchKeyWord,
          },
        });
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
          return rejectWithValue(
            error.response.data.message || error.response.data,
          );
        }
        return rejectWithValue(error.message);
      }
    },
  ),

  // Update a product
  updateProduct: createAsyncThunk(
    "products/update",
    async (
      { id, formData }: { id: string; formData: FormData },
      { rejectWithValue },
    ) => {
      try {
        const response = await axiosInstance.put(`products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);

        return response.data; // Return the updated product
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

  // Delete a product
  deleteProduct: createAsyncThunk(
    "products/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`products/${id}`);
        return id; // Return the deleted product ID
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
  fetchSingleProduct: createAsyncThunk<
    Product, // Type of the successful return value (the Product object)
    string, // Type of the argument passed to the thunk (the product ID)
    { rejectValue: string } // Type for rejectWithValue payload
  >(
    "products/fetchById", // <<< CORRECTED Action Type Name
    async (id: string, { rejectWithValue }) => {
      try {
        // Make the API call AND get the response
        const response = await axiosInstance.get<{ data: Product }>(
          `products/${id}`,
        ); // Adjust type based on actual API response structure

        // --- RETURN THE ACTUAL PRODUCT DATA ---
        // Check common structures: is data nested under a 'data' key?
        if (response.data && response.data.data) {
          return response.data.data; // <<< Return the product object
        }
        // Or maybe the product is directly in response.data?
        // else if (response.data) {
        //    return response.data as Product; // Cast if necessary
        //}

        // If response structure is unexpected
        throw new Error(
          "Unexpected API response structure for single product.",
        );
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            (error.response.data.message ||
              JSON.stringify(error.response.data))) ||
          error.message ||
          error.toString();
        return rejectWithValue(message);
      }
    },
  ),
};
