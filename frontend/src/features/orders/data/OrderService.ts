// src/features/orders/data/OrderService.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axios"; // Adjust path if needed
import { OrderModel } from "./orderModel";

// Define the structure for the update payload
interface UpdateOrderStatusPayload {
  orderId: string;
  status: OrderModel['status']; // Use the specific status type from OrderModel
}

export const OrdersService = {
  addOrder: createAsyncThunk(
    "orders/addOrder", // Corrected type name slightly for consistency
    async (orderData: Omit<OrderModel, '_id' | 'createdAt' | 'updatedAt' | '__v'>, { rejectWithValue }) => { // More specific input type
      try {
        // Assuming API takes order data and returns the created order { data: OrderModel }
        const response = await axiosInstance.post<{ data: OrderModel }>("orders", orderData);
        return response.data; // Payload will be { data: OrderModel }
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.response?.data || error.message);
      }
    }
  ),

  getAllOrders: createAsyncThunk(
    "orders/getAllOrders",
    async (_, { rejectWithValue }) => {
      try {
        // Assuming API returns { data: OrderModel[] }
        const response = await axiosInstance.get<{ data: OrderModel[] }>("orders");
        return response.data; // Payload will be { data: OrderModel[] }
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.response?.data || error.message);
      }
    }
  ),

  // --- Corrected Update Function ---
  updateOrderStatus: createAsyncThunk(
    "orders/updateStatus", // *** UNIQUE Action Type Name ***
    async ({ orderId, status }: UpdateOrderStatusPayload, { rejectWithValue }) => { // *** Accept orderId and status ***
      try {
        // Assuming API takes status in body and returns the updated order { data: OrderModel }
        const response = await axiosInstance.put<{ data: OrderModel }>(
          `orders/${orderId}`, // *** Use orderId in URL ***
          { status }          // *** Send status in body ***
        );
        return response.data; // Payload will be { data: OrderModel }
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.response?.data || error.message);
      }
    }
  ),
  getOrderById: createAsyncThunk(
    "orders/getORderByIt",
    async (customerId:String, { rejectWithValue }) => {
      try {
        // Assuming API returns { data: OrderModel[] }
        const response = await axiosInstance.get<{ data: OrderModel[] }>(`orders/${customerId}`);
        return response.data; // Payload will be { data: OrderModel[] }
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.response?.data || error.message);
      }
    }
  ),
  // --- Renamed updateAnOrder to updateOrderStatus ---
};