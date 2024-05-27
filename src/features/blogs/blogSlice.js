import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlogs = createAsyncThunk(
    "blog/get-blogs",
    async (thunkAPI) => {
        try {
            return await blogService.getBlogs()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getBlog = createAsyncThunk(
    "blog/get-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.getBlog(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const blogState = {
    blogs: [],
    singleBlog: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const blogSlice = createSlice({
    name: "blogs",
    initialState: blogState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.blogs = action.payload
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.singleBlog = action.payload
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
    }
})

export default blogSlice.reducer;