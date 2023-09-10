import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus:null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productEdit = createAsyncThunk(
  "products/productEdit",
 
  async (todo, { rejectWithValue }) => {
    try {
      const { _id, rating,  countInStock, uid } = todo;

      const response = await axios.put(baseURL + "products/" + _id, {
       rating,
       countInStock,
        uid,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const productsDelete = createAsyncThunk(
    "tour/deleteTour",
    async ({ id, toast }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${url}/products/${id}`);
        toast.success("Deleted Successfully");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  
);




const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Product Created!");
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [productsDelete.pending]: (state, action) => {
      state.loading = true;
    },
    [productsDelete.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    },
    [productsDelete.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    
    [productsDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter((item) => item._id !== action.payload._id);
      return {
        ...state,
        items: newList,
        deleteStatus: "success"
      };
      
    },
    [productsDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },

    [productEdit.pending]: (state, action) => {
    
       
        state.editStatus= "pending"
        
      
    },
    [productEdit.fulfilled]: (state, action) => {
      const updatedTodos = state.items.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
      return {
        ...state,
        items: updatedTodos,
       
        editStatus: "success",
      
      };
    },
    [productEdit.rejected]: (state, action) => {
      return {
        ...state,
        
        editStatus: "rejected",
       
      };
    },
    

  },
});

export default productsSlice.reducer;
