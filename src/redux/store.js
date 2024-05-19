import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { SellerReducer } from "./reducers/seller";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller : SellerReducer
  },
});

export default Store;
