import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // update informasi pengguna

  updateUserInfoRequest : (state) => {
    state.loading =true
  },
  updateUserInfoSuccess : (state,action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailed : (state,action) => {
    state.loading = false;
    state.error = action.payload
  },

  //update alamat pengguna

  updateUserAddressRequest : (state) => {
    state.addressloading = true;
  },
  updateUserAddressSuccess : (state,action) => {
    state.addressloading = false;
    state.updateAddressSuccessMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserAddressFailed : (state,action) => {
    state.loading = false ;
    state.error = action.payload
  },

  //hapus alamat pengguna 

  deleteUserAddressRequest : (state) => {
    state.deleteaddloading = true;
  },
  deleteUserAddressSuccess : (state,action) => {
    state.deleteaddloading = false;
    state.user = action.payload.user
    state.deleteAddressSuccessMessage = action.payload.successMessage
  },
  deleteUserAddressFailed : (state,action) => {
    state.deleteaddloading = false;
    state.error = action.payload;
  },

  //bersihin error state
  clearErrors: (state) => {
    state.error = null;
  },
});
