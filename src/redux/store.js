import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { SellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller : SellerReducer,
    products : productReducer,
    events : eventReducer
  },
});

export default Store;
