import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true,
}

export const productReducer = createReducer(initialState, {
    productCreateRequest : (state) => {
        state.isLoading = true;
    },
    productCreateSuccess : (state,action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    },
    productCreateFail : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get all product dari shop

    getAllProductsShopRequest : (state) => {
        state.isLoading = true;
    },
    getAllProductsShopSuccess : (state,action) => {
        state.isLoading = false;
        state.products = action.payload;
    },
    getAllProductsShopFailed : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },


    // delete product dari shop
    deleteProductRequest : (state) => {
        state.isLoading = true;
    },
    deleteProductSuccess : (state,action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteProductFailed : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
}) 