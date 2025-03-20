import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../utils/axios";

export const CategoriesService = {
    fetchAllCategories: createAsyncThunk(
        "categories/fetchAll", async (params:{page?:number ,limit?:number},{rejectWithValue}) => {
            try {
                const { page,limit} = params; 
                const response = await axiosInstance.get("categories", {
                    params: {
                        limit , 
                        page
                    }
                });
                console.log(response.data);
                
               return response.data; 
                
            } catch (error: any) {
                return rejectWithValue(error.message);
            }
        }
    )
}