import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Added PayloadAction
import { UserModel } from "../Auth/data/UserModel"; // Adjust path if needed
import { UserService } from "./UserService";
import { AuthService } from "../Auth/data/AuthService"; // Import AuthService
import { Product } from "../admin/data/models/ProductModel"; // Adjust path if needed
import { Address } from "./AdressModel";

interface UserState {
  user: UserModel | null;
  loading: boolean; // Represents general loading, maybe refine later if needed
  error: string | null;
  isAuthenticated: boolean; // <-- Added explicit flag
  detailedWishList?: Product[];
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: true, // Initial loading for checkAuth might be true if run immediately
  isAuthenticated: false, // <-- Initialized
  detailedWishList: [],   // Initialize as empty array
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Synchronous action to handle logout initiated by UI
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.detailedWishList = []; // Clear wishlist details on logout
      // Clear token from storage (example)
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken"); // Or sessionStorage
      // Maybe redirect logic belongs elsewhere (e.g., in the component dispatching logout)
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Check Auth cases ---
      .addCase(UserService.checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
        // Keep isAuthenticated potentially true during check if user exists? Or set false?
        // Let's clear user for consistency if check requires loading
        // state.user = null; // Optional: clear user during re-check?
      })
      .addCase(UserService.checkAuth.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload; // <-- Correctly sets user
        state.isAuthenticated = true; // <-- Set authenticated
      })
      .addCase(UserService.checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null; // <-- *** FIX: Clear user on failure ***
        state.isAuthenticated = false; // <-- Set not authenticated
      })

      // --- Login cases ---
      .addCase(AuthService.login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null; // Clear previous user
        state.isAuthenticated = false;
      })
      // Adjust payload type based on what AuthService.login returns (e.g., { user: UserModel, token: string })
      .addCase(AuthService.login.fulfilled, (state, action: PayloadAction<{ user: UserModel, token: string }>) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user; // <-- Store user from login payload
        state.isAuthenticated = true; // <-- Set authenticated
        // Store token (example)
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(AuthService.login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isAuthenticated = false;
      })

      // --- Logout cases (if using async thunk) ---
      .addCase(AuthService.logout.pending, (state) => {
         state.loading = true;
      })
      .addCase(AuthService.logout.fulfilled, (state) => {
         // Use the synchronous reducer logic for consistency
         userSlice.caseReducers.logoutUser(state);
      })
      .addCase(AuthService.logout.rejected, (state, action) => {
          // Still log out frontend even if API fails
         userSlice.caseReducers.logoutUser(state);
         state.error = action.payload as string; // Keep the error message
      })

      // --- Register cases --- (Often don't log user in automatically)
      .addCase(AuthService.register.pending, (state) => {
         state.loading = true;
         state.error = null;
      })
      .addCase(AuthService.register.fulfilled, (state) => {
         state.loading = false;
         // Usually no change to user/isAuthenticated state here
      })
      .addCase(AuthService.register.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload as string;
      })


      // --- Wishlist ---
      .addCase(UserService.addPrdouctToWishList.pending, (state) => {
        // Use specific loading flags if general 'loading' causes UI issues elsewhere
        // state.loadingWishlist = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(UserService.addPrdouctToWishList.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        if (state.user && action.payload) {
          const productId = action.payload;
          // Ensure wishlist array exists
          if (!state.user.wishlist) state.user.wishlist = [];
          if (!state.user.wishlist.includes(productId)) {
            state.user.wishlist.push(productId);
          }
        }
      })
      .addCase(UserService.addPrdouctToWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(UserService.getAllWishListProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Adjust payload type if API response structure is different
      .addCase(UserService.getAllWishListProducts.fulfilled, (state, action: PayloadAction<{ data: Product[] }>) => {
        state.loading = false;
        state.detailedWishList = action.payload.data;
      })
      .addCase(UserService.getAllWishListProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.detailedWishList = []; // Clear on error? Or keep stale?
      })

      .addCase(UserService.removeProductFromWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       // Assuming payload is the removed productId (string)
      .addCase(UserService.removeProductFromWishList.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const productIdToRemove = action.payload;
        if (state.user?.wishlist) {
          state.user.wishlist = state.user.wishlist.filter(
            (wishListId) => wishListId !== productIdToRemove
          );
        }
        if (state.detailedWishList) {
          state.detailedWishList = state.detailedWishList.filter(
            (product) => product._id !== productIdToRemove
          );
        }
      })
      .addCase(UserService.removeProductFromWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- Addresses ---
      .addCase(UserService.addingNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Assuming payload is { data: AddressModel }
      .addCase(UserService.addingNewAddress.fulfilled, (state, action: PayloadAction<{ data: Address }>) => {
        state.loading = false;
        if (state.user && action.payload?.data) {
           // Ensure addresses array exists
          if (!state.user.addresses) state.user.addresses = [];
          // Push using Immer's mutation style
          state.user.addresses.push(action.payload.data);
        }
      })
      .addCase(UserService.addingNewAddress.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload as string;
      })

      .addCase(UserService.removeAnAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Assuming payload is the ID of the removed address (string)
      .addCase(UserService.removeAnAddress.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const addressIdToRemove = action.payload;
        if (state.user?.addresses) {
            // Filter out the removed address
             state.user.addresses = state.user.addresses.filter(
                 (address) => address._id !== addressIdToRemove // Assuming AddressModel has _id
             );
        }
      })
      .addCase(UserService.removeAnAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the synchronous action
export const { logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;