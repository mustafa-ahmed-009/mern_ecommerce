import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "../features/home/presentation/slices/CategriesSlice";
export const store = configureStore({
    reducer: {
        categories:categoriesReducer
}    
}); 

export type AppStore = typeof store; 
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
