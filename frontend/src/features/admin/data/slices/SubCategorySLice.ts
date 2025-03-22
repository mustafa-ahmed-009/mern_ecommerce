import { createSlice } from "@reduxjs/toolkit";
import { SubCategoryModel } from "../models/SubCategoryModel"; // Import your SubCategoryModel
import { PaginationData } from "../models/PaginationModel"; // Assuming you have a PaginationModel
import { SubCategoriesService } from "../services/SubCategoryService";
import SubCategoryItem from "../../presentation/components/subCategory/subCategoryItem";

interface SubCategoryState {
  pageCount: number;
  subCategoriesList: SubCategoryModel[];
  loading: boolean;
  error: string | null;
  paginationData: PaginationData;
}

const initialState: SubCategoryState = {
  pageCount: 0,
  subCategoriesList: [],
  error: null,
  loading: false,
  paginationData: {
    currentPage: 0, // Default value
    limit: 10, // Default value
    numberOfPages: 0, // Default value
    next: 0, // Default value
  },
};

export const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {}, // No additional reducers for now
  extraReducers: (builder) => {
    builder
      // Fetch all subcategories
      .addCase(SubCategoriesService.fetchAllSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SubCategoriesService.fetchAllSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.paginationData = action.payload.paginationResult; // Update pagination data
        state.subCategoriesList = action.payload.data; // Update subcategories list
        state.pageCount = action.payload.paginationResult.numberOfPages; // Update page count
      })
      .addCase(SubCategoriesService.fetchAllSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      })

      // Create a subcategory
      .addCase(SubCategoriesService.createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SubCategoriesService.createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const subCategory: SubCategoryModel = action.payload.data; 
        state.subCategoriesList.push(subCategory); // Add the new subcategory to the list
      })
      .addCase(SubCategoriesService.createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      })

      // Update a subcategory
      .addCase(SubCategoriesService.updateSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SubCategoriesService.updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Update the subcategory in the list
        const updatedSubCategory = action.payload.data;
        state.subCategoriesList = state.subCategoriesList.map((subCategory) => { 
    
          
       return   subCategory._id === updatedSubCategory._id ? updatedSubCategory : subCategory

        }
        );
      })
      .addCase(SubCategoriesService.updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      })

      // Delete a subcategory
      .addCase(SubCategoriesService.deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SubCategoriesService.deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted subcategory from the list
        const deletedSubCategoryId = action.payload;
        state.subCategoriesList = state.subCategoriesList.filter(
          (subCategory) => subCategory._id !== deletedSubCategoryId
        );
      })
      .addCase(SubCategoriesService.deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

export const subCategoryReducer = subCategorySlice.reducer;