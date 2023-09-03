import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {url, setHeaders } from "./api";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  country:"",
  img:"",
  address:"",
  age:"",
  city:"",
  phone:"",
  isAdmin: false,
  varified:false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  deleteStatus:""
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/register`, {
        name: values.name,
        email: values.email,
        country: values.country,
        address: values.address,
        city: values.city,
        img:values.img,
        age:values.age,
        phone: values.phone,
        verified:values.verified,
        password: values.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const productsDelete = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${url}/register/${id}`,
       
        setHeaders()
      );
      toast.success("Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(`${url}/user/${id}`, setHeaders());

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          country: user.country,
        address: user.address,
        age:user.age,
        city: user.city,
        img:user.img,
        phone: user.phone,
          isAdmin: user.isAdmin,
          verified:user.verified,
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        age:"",
        isAdmin: false,
        verified:false,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          country: user.country,
          address: user.address,
          verified:user.verified,
          city: user.city,
          age: user.age,
          img:user.img,
          phone: user.phone,
          _id: user._id,
          isAdmin: user.isAdmin,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
         
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
      
          _id: user._id,
          isAdmin: user.isAdmin,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });

    builder.addCase(productsDelete.pending, (state, action) => {
      return {
        ...state,
        deleteStatus: "pending",
      };
    });
    builder.addCase(productsDelete.fulfilled, (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    });
    builder.addCase(productsDelete.rejected, (state, action) => {
      return {
        ...state,
        deleteStatus: "rejected",
        getUserError: action.payload,
      };
    });

    
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
