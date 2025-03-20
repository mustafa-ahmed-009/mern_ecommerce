import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../utils/axios";

export const CategoriesService = {
    fetchAllCategories: createAsyncThunk(
        "categories/fetchAll", async (_,{rejectWithValue}) => {
            try {
                const response = await axiosInstance.get("categories");
               return response.data.data; 
                
            } catch (error: any) {
                return rejectWithValue(error.message);
            }
        }
    )
}