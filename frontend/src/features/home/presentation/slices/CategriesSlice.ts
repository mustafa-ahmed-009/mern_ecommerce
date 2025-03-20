import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../data/models/CategoryModel";
import { CategoriesService } from "../../data/services/CategoriesService";
interface CategoriesState {
  pageCount: number;
  categoriesList: Category[];
  loading: boolean;
  error: string | null;
}
const initialState: CategoriesState = {
  pageCount: 0,
  categoriesList: [],
  error: null,
  loading: false,
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
          state.categoriesList = action.payload;
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
      );
  },
});
export const categoriesReducer = categoriesSlice.reducer;
