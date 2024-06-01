import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getUserProductWishlist = createAsyncThunk(
    "auth/wishlist ",
    async (thunkAPI) => {
        try {
            return await authService.getUserWishlist()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addProductToCart = createAsyncThunk(
    "auth/cart/add ",
    async (cartData, thunkAPI) => {
        try {
            return await authService.addToCart(cartData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getUserCart = createAsyncThunk(
    "auth/cart/get ",
    async (thunkAPI) => {
        try {
            return await authService.getCart()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteCartProduct = createAsyncThunk(
    "auth/cart/product/delete ",
    async (cartItemId, thunkAPI) => {
        try {
            return await authService.removeProductFromCart(cartItemId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateCartProduct = createAsyncThunk(
    "auth/cart/product/update ",
    async (cartDetail, thunkAPI) => {
        try {
            return await authService.updateProductFromCart(cartDetail)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createAnOrder = createAsyncThunk(
    "auth/cart/create-order ",
    async (orderDetail, thunkAPI) => {
        try {
            return await authService.createOrder(orderDetail)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const getCustomerfromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    wishlist: [],
    cartProduct: [],
    cartProducts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.createdUser = action.payload
                if (state.isSuccess === true) {
                    toast.info("User Created Successfully !")
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
                if (state.isSuccess === true) {
                    localStorage.setItem("token", action.payload.token)
                    toast.success("Login Successfully !")
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.wishlist = action.payload
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.cartProduct = action.payload
                if (state.isSuccess === true) {
                    toast.success('Product Added To Cart !')
                }
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.cartProducts = action.payload
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.deleteCartProduct = action.payload
                if (state.isSuccess === true) {
                    toast.success("Remove Product Successfully !")
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Something went wrong !")
                }
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.updateCartProduct = action.payload
                // if (state.isSuccess === true) {
                //     toast.success("Remove Product Successfully !")
                // }
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Something went wrong !")
                }
            })
            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.orderedProduct = action.payload
                if (state.isSuccess === true) {
                    toast.success("Ordered Successfully !")
                }
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Something went wrong !")
                }
            })
    }
})

export default authSlice.reducer;