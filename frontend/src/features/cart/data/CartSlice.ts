import { createSlice } from "@reduxjs/toolkit";
import { CartModel } from "./CartModel";
import { CartService } from "./CartService";

interface CartState {
  cart: CartModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  error: null,
  loading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null; // Reset cart to initial null state
      state.error = null; // Optional: also clear any errors
      state.loading = false; // Optional: ensure loading is false
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth cases
      .addCase(CartService.addAnItemToTheCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CartService.addAnItemToTheCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        state.error = null;
      })
      .addCase(CartService.addAnItemToTheCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(CartService.getUserCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CartService.getUserCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(CartService.getUserCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(CartService.changeProductQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CartService.changeProductQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(CartService.changeProductQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(CartService.removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CartService.removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(CartService.removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(CartService.applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CartService.applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(CartService.applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(CartService.deleteTheWholeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CartService.deleteTheWholeCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
      })
      .addCase(CartService.deleteTheWholeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
