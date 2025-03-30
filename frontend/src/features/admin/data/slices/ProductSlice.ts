import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../models/ProductModel";
import { PaginationData } from "../models/PaginationModel";
import { ProductsService } from "../services/ProductService";

interface ProductsState {
  pageCount: number;
  productsList: Product[];
  searchedProductList: Product[];
  loading: boolean;
  error: string | null;
  paginationData: PaginationData;
  currentProduct: Product | null;
  loadingSingle: boolean; // Loading for single product view
  errorSingle: string | null;
}

const initialState: ProductsState = {
  pageCount: 0,
  searchedProductList:[], 
  productsList: [],
  error: null,
  loading: false,
  paginationData: {
    currentPage: 0, // Default value
    limit: 10, // Default value
    numberOfPages: 0, // Default value
    next: 0, // Default value
  },
  currentProduct: null,
  loadingSingle: false,
  errorSingle: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(ProductsService.fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.paginationData = action.payload.paginationResult;
        state.productsList = action.payload.data;
      })
      .addCase(ProductsService.fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductsService.fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(ProductsService.searchInProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedProductList = action.payload.data;
      })
      .addCase(ProductsService.searchInProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductsService.searchInProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create a product
      .addCase(ProductsService.createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductsService.createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productsList.push(action.payload); // Add the new product to the list
      })
      .addCase(ProductsService.createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update a product
      .addCase(ProductsService.updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductsService.updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.productsList.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.productsList[index] = updatedProduct; // Update the product in the list
        }
      })
      .addCase(ProductsService.updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete a product
      .addCase(ProductsService.deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductsService.deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProductId = action.payload;
        state.productsList = state.productsList.filter(
          (product) => product._id !== deletedProductId
        ); // Remove the deleted product from the list
      })
      .addCase(ProductsService.deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(ProductsService.fetchSingleProduct.pending, (state) => {
        state.loadingSingle = true;
        state.errorSingle = null;
        state.currentProduct = null; // Clear previous while loading
      })
      .addCase(ProductsService.fetchSingleProduct.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.currentProduct = action.payload; // Store the fetched product
      })
      .addCase(ProductsService.fetchSingleProduct.rejected, (state, action) => {
        state.loadingSingle = false;
        state.errorSingle = action.payload as string;
      });
    
  },
});

export const productsReducer = productsSlice.reducer;