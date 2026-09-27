import { axiosInstance } from "@/lib/axiosInstance";
import { ENDPOINT } from "@/services/helper/endPoint";
import { getErrorMessage } from "@/services/helper/global.helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: {
    login: false,
    logout: false,
    register: false,
    verifyEmail: false,
  },
  error: {
    login: null,
    logout: null,
    register: null,
    verifyEmail: null,
  },
};

export const loginUser = createAsyncThunk(
  "login/slice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${ENDPOINT.auth.login}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const registerUser = createAsyncThunk(
  "register/slice",
  async ({data}: {data: FormData}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.auth.register}`,
        data,
        {
         headers: {
            "Content-Type": "multipart/form-data"
         }
        }
      );
      console.log("response from register user thunk", response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const verifyEmailUser = createAsyncThunk(
  "verify-email/slice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.auth.verifyEmail}`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logout = createAsyncThunk(
  "logout/slice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${ENDPOINT.auth.logout}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading.register = true;
        state.error.register = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading.register = false;
        state.error.register = null;
        console.log("action from builder register", action.payload)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register = action.payload as string || "something went wrong";
      })
      .addCase(verifyEmailUser.pending, (state) => {
        state.loading.verifyEmail = true;
        state.error.verifyEmail = null;
      })
      .addCase(verifyEmailUser.fulfilled, (state) => {
        state.loading.verifyEmail = false;
        state.error.verifyEmail = null;
      })
      .addCase(verifyEmailUser.rejected, (state, action) => {
        state.loading.verifyEmail = false;
        state.error.verifyEmail =  action.payload as string || "something went wrong";
    
      })
      .addCase(loginUser.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading.login = false;
        state.error.login = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login =  action.payload as string || "something went wrong"
      })
      .addCase(logout.pending, (state) => {
        state.loading.logout = true;
        state.error.logout = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading.logout = false;
        state.error.logout = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading.logout = false;
        state.error.logout =  action.payload as string || "something went wrong"
      });
  },
});

export default authSlice.reducer;
