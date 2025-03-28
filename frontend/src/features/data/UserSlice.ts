import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Auth/data/UserModel";
import { UserService } from "./UserService";
import { Product } from "../admin/data/models/ProductModel";

interface UserState {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
  detailedWishList?: Product[];
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth cases
      .addCase(UserService.checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserService.checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UserService.checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add Product to Wishlist
      .addCase(UserService.addPrdouctToWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserService.addPrdouctToWishList.fulfilled, (state, action) => {
        state.loading = false;
        
        // Ensure user exists and the product is not already in the wishlist
        if (state.user && action.payload) {
          const productId = action.payload;
          if (!state.user.wishlist.includes(productId)) {
            state.user.wishlist.push(productId);
          }
        }
      })
      .addCase(UserService.addPrdouctToWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get All Wishlist Products
      .addCase(UserService.getAllWishListProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserService.getAllWishListProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.detailedWishList = action.payload.data;
      })
      .addCase(UserService.getAllWishListProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Remove Product from Wishlist
      .addCase(UserService.removeProductFromWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserService.removeProductFromWishList.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure user exists and remove the product from wishlist
        if (state.user) {
          state.user.wishlist = state.user.wishlist.filter(
            (wishListId: string) => wishListId !== action.payload
          );
        }
        
        // Also update detailedWishList if it exists
        if (state.detailedWishList) {
          state.detailedWishList = state.detailedWishList.filter(
            (product) => product._id !== action.payload
          );
        }
      })
      .addCase(UserService.removeProductFromWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const userReducer = userSlice.reducer;