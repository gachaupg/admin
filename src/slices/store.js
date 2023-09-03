import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";
import TourReducer from "../slices/productsSlice";
import todReducer from "../slices/todosSlice"
export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    todo: todReducer,
  },
});
