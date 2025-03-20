import { PaginationData } from './../../data/models/PaginationModel';
import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../data/models/CategoryModel";
import { CategoriesService } from "../../data/services/CategoriesService";
interface CategoriesState {
  pageCount: number;
  categoriesList: Category[];
  loading: boolean;
  error: string | null;
  paginationData: PaginationData
}


const initialState: CategoriesState = {
  pageCount: 0,
  categoriesList: [],
  error: null,
  loading: false,
  paginationData: {
    currentPage: 0, // Default value
    limit: 10, // Default value
    numberOfPages: 0, // Default value
    next: 0, // Default value
  },
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        CategoriesService.fetchAllCategories.fulfilled,
        (state, action) => {
          state.loading = false;
          state.paginationData = action.payload.paginationResult
          state.categoriesList = action.payload.data;
        }
      )
      .addCase(CategoriesService.fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        CategoriesService.fetchAllCategories.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
    ) .addCase(CategoriesService.createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(CategoriesService.createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categoriesList.push(action.payload); // Add the new category to the list
    })
    .addCase(CategoriesService.createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    
  },
});
export const categoriesReducer = categoriesSlice.reducer;
