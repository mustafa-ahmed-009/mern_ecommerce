import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axios";
import { OrderModel } from "./orderModel";

export const OrdersService = {
  addOrder: createAsyncThunk(
    "orders/addOrders",
    async (orderModel: OrderModel, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("orders", 
            orderModel,
        );
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),

  getAllOrders: createAsyncThunk(
    "orders/getAllOrders",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("orders");
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
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
          quantity: increase ? 1 :-1,
        });

        return response.data; // Ensure this matches `ChangeProductQuantityResponse`
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),
  removeCartItem: createAsyncThunk(
    "cart/removeCartItem",
    async (cartItemId:string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`cart/${cartItemId}`);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  ),
  applyCoupon: createAsyncThunk(
    "cart/applyCoupon",
    async (coupon:string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`cart/applyCoupon`, {
          coupon
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
