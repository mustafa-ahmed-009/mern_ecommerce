import { createSlice } from "@reduxjs/toolkit";
import { Brand } from "../models/BrandModel";
import { PaginationData } from "../models/PaginationModel";
import { BrandsService } from "../services/BranderService";

interface BrandState {
  pageCount: number;
  brandsList: Brand[];
  loading: boolean;
  error: string | null;
  paginationData: PaginationData;
}

const initialState: BrandState = {
  pageCount: 0,
  brandsList: [],
  error: null,
  loading: false,
  paginationData: {
    currentPage: 0, // Default value
    limit: 10, // Default value
    numberOfPages: 0, // Default value
    next: 0, // Default value
  },
};
export const brandSLice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all brands
      .addCase(BrandsService.fetchAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BrandsService.fetchAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.paginationData = action.payload.paginationResult;
        state.brandsList = action.payload.data;
        state.pageCount = action.payload.paginationResult.numberOfPages; // Update pageCount
      })
      .addCase(BrandsService.fetchAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create a brand
      .addCase(BrandsService.createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BrandsService.createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brandsList.push(action.payload); // Add the new brand to the list
      })
      .addCase(BrandsService.createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update a brand
      .addCase(BrandsService.update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BrandsService.update.fulfilled, (state, action) => {
        state.loading = false;
        // Update the brand in the list
        const updatedBrand = action.payload;
        state.brandsList = state.brandsList.map((brand) =>
        {
          console.log(updatedBrand._id);
          console.log(brand._id);
          
          
        return  brand._id === updatedBrand._id ? updatedBrand : brand
   }
        );
      })
      .addCase(BrandsService.update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete a brand
      .addCase(BrandsService.deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BrandsService.deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted brand from the list
        const deletedBrandId = action.payload;
        state.brandsList = state.brandsList.filter(
          (brand) => brand._id !== deletedBrandId
        );
      })
      .addCase(BrandsService.deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const brandsReducer = brandSLice.reducer;
