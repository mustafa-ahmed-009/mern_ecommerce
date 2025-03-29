import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "../features/admin/data/slices/CategriesSlice";
import { brandsReducer } from "../features/admin/data/slices/BrandsSLice";
import { subCategoryReducer } from "../features/admin/data/slices/SubCategorySLice";
import { productsReducer } from "../features/admin/data/slices/ProductSlice";
import { authReducer } from "../features/Auth/data/AuthSlice";
import { userReducer } from "../features/data/UserSlice";
import { cartReducer } from "../features/cart/data/CartSlice";
import { orderReducer } from "../features/orders/data/OrderSlice";
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    brands: brandsReducer,
    subCategories: subCategoryReducer,
    products: productsReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
