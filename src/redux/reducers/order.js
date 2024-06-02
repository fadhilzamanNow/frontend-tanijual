import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true,
}

export const orderReducer = createReducer(initialState, {
    

    // get all order dari user tertentu

    getAllOrdersUserRequest : (state) => {
        state.isLoading = true;
    },
    getAllOrdersUserSuccess : (state,action) => {
        state.isLoading = false;
        state.orders = action.payload;
    },
    getAllOrdersUserFailed : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // get all order dari shop tertentu
    getAllOrdersShopRequest : (state) => {
        state.isLoading = true;
    },
    getAllOrdersShopSuccess : (state,action) => {
        state.isLoading = false;
        state.orders = action.payload;
    },
    getAllOrdersShopFailed : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },




    // bersihin cache
    clearErrors: (state) => {
        state.error = null;
    }

    
    
}) 