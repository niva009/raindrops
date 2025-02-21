import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/reducer/cartReducer";
import authReducer from '../redux/reducer/authReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
