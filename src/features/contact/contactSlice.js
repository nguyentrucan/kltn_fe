import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const createEnquiry = createAsyncThunk(
    "contact/post",
    async (contactData, thunkAPI) => {
        try {
            return await contactService.postEnquiry(contactData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const contactState = {
    contact: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const resetState = createAction('Reset_all')

export const contactSlice = createSlice({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createEnquiry.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createEnquiry.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.contact = action.payload
                if (state.isSuccess === true) {
                    toast.success("Contact Form Submitted Successfully !")
                }
            })
            .addCase(createEnquiry.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Something went wrong !")
                }
            })
            .addCase(resetState, () => contactState)
    }
})

export default contactSlice.reducer;