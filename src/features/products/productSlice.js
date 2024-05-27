import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
    "product/get-products",
    async (thunkAPI) => {
        try {
            return await productService.getProducts()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProduct = createAsyncThunk(
    "product/get-product",
    async (id, thunkAPI) => {
        try {
            return await productService.getProduct(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addToWishList = createAsyncThunk(
    "product/wishlist",
    async (prodId, thunkAPI) => {
        try {
            return await productService.addToWishList(prodId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const productState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const productSlice = createSlice({
    name: "products",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(addToWishList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.addToWishList = action.payload
                if (state.isSuccess === true) {
                    toast.info("Product Added Successfully !")
                }
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.product = action.payload
                state.message = 'Product Fetched Successfully !'
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
    }
})

export default productSlice.reducer;