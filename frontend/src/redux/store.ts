import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "../features/admin/data/slices/CategriesSlice";
import { brandsReducer } from "../features/admin/data/slices/BrandsSLice";
import { subCategoryReducer } from "../features/admin/data/slices/SubCategorySLice";
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    brands: brandsReducer,
    subCategores : subCategoryReducer
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
