// src/features/orders/data/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersService } from "./OrderService";
import { OrderModel } from "./orderModel";

interface OrdersState { // Renamed interface for clarity
  orders: OrderModel[]; // *** Renamed ordersList to orders ***
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [], // *** Renamed ordersList to orders ***
  error: null,
  loading: false,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Potential synchronous reducers can go here if needed
  },
  extraReducers: (builder) => {
    builder
      // --- Add Order ---
      .addCase(OrdersService.addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Assuming payload is { data: OrderModel }
      .addCase(OrdersService.addOrder.fulfilled, (state, action: PayloadAction<{ data: OrderModel }>) => {
          state.loading = false;
          // Add the new order to the beginning of the list for better UX
          state.orders.unshift(action.payload.data);
      })
      .addCase(OrdersService.addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- Get All Orders ---
      .addCase(OrdersService.getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Assuming payload is { data: OrderModel[] }
      .addCase(OrdersService.getAllOrders.fulfilled, (state, action: PayloadAction<{ data: OrderModel[] }>) => {
        state.loading = false;
        state.orders = action.payload.data; // *** Correctly replace the list ***
      })
      .addCase(OrdersService.getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orders = []; // Clear orders on error? Optional.
      })
      .addCase(OrdersService.getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Assuming payload is { data: OrderModel[] }
      .addCase(OrdersService.getOrderById.fulfilled, (state, action: PayloadAction<{ data: OrderModel[] }>) => {
        state.loading = false;
        state.orders = action.payload.data; // *** Correctly replace the list ***
      })
      .addCase(OrdersService.getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orders = []; // Clear orders on error? Optional.
      })

      // --- Update Order Status --- (Renamed from updateAnOrder)
      .addCase(OrdersService.updateOrderStatus.pending, (state, action) => {
        // Optionally set loading only for the specific order if needed,
        // but general loading flag is simpler for now.
        state.loading = true;
        state.error = null;
        // We know which order is being updated from action.meta.arg
        // console.log("Updating order:", action.meta.arg.orderId);
      })
      // Assuming payload is { data: OrderModel } containing the *updated* order
      .addCase(OrdersService.updateOrderStatus.fulfilled, (state, action: PayloadAction<{ data: OrderModel }>) => {
        state.loading = false;
        const updatedOrder = action.payload.data;
        // Find the index of the order that was updated
        const index = state.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          // Replace the old order with the updated one
          state.orders[index] = updatedOrder; // *** Correct way to update ***
        }
      })
      .addCase(OrdersService.updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Optionally show error related to specific order ID: action.meta.arg.orderId
      });
    
  },
});

export const orderReducer = orderSlice.reducer;