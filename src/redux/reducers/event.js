import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true,
}

export const eventReducer = createReducer(initialState, {
    eventCreateRequest : (state) => {
        state.isLoading = true;
    },
    eventCreateSuccess : (state,action) => {
        state.isLoading = false;
        state.event = action.payload;
        state.success = true;
    },
    eventCreateFail : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get all event dari shop

    getAlleventsShopRequest : (state) => {
        state.isLoading = true;
    },
    getAlleventsShopSuccess : (state,action) => {
        state.isLoading = false;
        state.events = action.payload;
    },
    getAlleventsShopFailed : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },


    // delete event dari shop
    deleteeventRequest : (state) => {
        state.isLoading = true;
    },
    deleteeventSuccess : (state,action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteeventFailed : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
}) 