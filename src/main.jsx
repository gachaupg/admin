import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todosSlice";

import productsReducer, { productsFetch } from "./slices/productsSlice";
import cartReducer, { getTotals } from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { productsApi } from "./slices/productsApi";
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    todosState: todosReducer,
 

    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
