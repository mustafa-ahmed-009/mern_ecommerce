import { createSlice } from "@reduxjs/toolkit";
import { CartModel } from "../../cart/data/CartModel";
import { CartService } from "../../cart/data/CartService";
import { OrdersService } from "./OrderService";
import { OrderModel } from "./orderModel";


interface ordersState {
  ordersList: OrderModel[] ;
  loading: boolean;
  error: string | null;
}

const initialState: ordersState = {
    ordersList: [],
  error: null,
  loading: false,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth cases
      .addCase(OrdersService.addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(OrdersService.addOrder.fulfilled, (state,action) => {
          state.loading = false;
        //   if (state.ordersList && action.payload) {
        //       if (!state.ordersList.includes(productId)) {
        //         state.ordersList.push()
        //     }
        //   }
          state.ordersList.push(action.payload.data)
      })
 
      .addCase(OrdersService.getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(OrdersService.getAllOrders.fulfilled, (state,action) => {
        state.loading = false;
        for (let index = 0; index < action.payload.data.length; index++) {
          state.ordersList.push(action.payload.data[index])
        }
      })
      .addCase(OrdersService.getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    //   .addCase(CartService.getUserCartItems.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(CartService.getUserCartItems.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.cart = action.payload.data;
    //   })
    //   .addCase(CartService.getUserCartItems.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    //   .addCase(CartService.changeProductQuantity.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(CartService.changeProductQuantity.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.cart = action.payload.data;
    //   })
    //   .addCase(CartService.changeProductQuantity.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    //   .addCase(CartService.removeCartItem.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(CartService.removeCartItem.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.cart = action.payload.data;
    //   })
    //   .addCase(CartService.removeCartItem.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    //   .addCase(CartService.applyCoupon.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(CartService.applyCoupon.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.cart = action.payload.data;
    //   })
    //   .addCase(CartService.applyCoupon.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    
  },
});

export const orderReducer = orderSlice.reducer;