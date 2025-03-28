import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import { Address } from "./AdressModel";




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

  // wishList related logic 
  addPrdouctToWishList: createAsyncThunk(
    "user/addingWishList",
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("wishlist", {
                productId
            });
            // Return the product ID to update the state
            return productId;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
),
  getAllWishListProducts: createAsyncThunk(
    "user/getAllWishListProducts",
    async (_,{ rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("wishlist");
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),
  removeProductFromWishList: createAsyncThunk(
    "user/removeProductFromWishList",
    async (productId:string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`wishlist/${productId}`)
        return productId;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),


  // address related logic 
  addingNewAddress: createAsyncThunk(
    "user/addingAddress",
    async (address:Address, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("address" , address);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
  ),
  getAllAddress: createAsyncThunk(
    "user/getAllAdress",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("address");
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
  ),
  removeAnAddress: createAsyncThunk(
    "user/removeAddress",
    async (addressId :string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`address/${addressId}`);
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