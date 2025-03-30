import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axios";

export const CartService = {
  addAnItemToTheCart: createAsyncThunk(
    "cart/addItem",
    async (productId: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("cart", {
          productId,
        });
        console.log(response.data);

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

  getUserCartItems: createAsyncThunk(
    "cart/getCartItems",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("cart");

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

  // ✅ Fixing the type order
  changeProductQuantity: createAsyncThunk<
    ChangeProductQuantityResponse, // Correct return type
    changeProdcutQuantityProps // Correct argument type
  >(
    "cart/changeProductQuantity",
    async ({ cartItemId, increase }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`cart/${cartItemId}`, {
          quantity: increase ? 1 : -1,
        });

        return response.data; // Ensure this matches `ChangeProductQuantityResponse`
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
  removeCartItem: createAsyncThunk(
    "cart/removeCartItem",
    async (cartItemId: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`cart/${cartItemId}`);
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
  applyCoupon: createAsyncThunk(
    "cart/applyCoupon",
    async (coupon: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`cart/applyCoupon`, {
          coupon,
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
  deleteTheWholeCart: createAsyncThunk(
    "cart/deleteTheWholeCart",
    async (_, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`cart`);
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

// ✅ Fixing interface names (typo)
interface changeProdcutQuantityProps {
  cartItemId: string;
  increase: boolean;
}

// ✅ Make sure ChangeProductQuantityResponse matches API response correctly
interface ChangeProductQuantityResponse {
  cartItemId?: string; // If response contains `cartItemId`, define it here
  data: any; // Replace `any` with actual response type if known
}
