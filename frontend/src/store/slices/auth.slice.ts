import { axiosInstance } from "@/lib/axiosInstance";
import { ENDPOINT } from "@/services/helper/endPoint";
import { getErrorMessage } from "@/services/helper/global.helper";
import {
  ForgotPasswordType,
  LoginType,
  RegisterType,
  ResetPasswordType,
  VerifyEmailType,
} from "@/typescript/type/auth.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loading: {
    login: boolean;
    logout: boolean;
    register: boolean;
    verifyEmail: boolean;
    forgotPassword: boolean;
    resetPassword: boolean;
  };
  error: {
    login: string | null;
    logout: string | null;
    register: string | null;
    verifyEmail: string | null;
    forgotPassword: string | null;
    resetPassword: string | null;
  };
}

const initialState: AuthState = {
  loading: {
    login: false,
    logout: false,
    register: false,
    verifyEmail: false,
    forgotPassword: false,
    resetPassword: false,
  },
  error: {
    login: null,
    logout: null,
    register: null,
    verifyEmail: null,
    forgotPassword: null,
    resetPassword: null,
  },
};

export const loginUser = createAsyncThunk(
  "login/slice",
  async (data: LoginType, { rejectWithValue }) => {
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
  async (data: RegisterType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.auth.register}`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const verifyEmailUser = createAsyncThunk(
  "verify-email/slice",
  async (data: VerifyEmailType, { rejectWithValue }) => {
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

export const forgotPassword = createAsyncThunk(
  "forgot-password/slice",
  async (data: ForgotPasswordType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.auth.forgotPassword}`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// export const resetPassword = createAsyncThunk(
//   "reset-password/slice",
//   async (
//     { token, password }: ResetPasswordType & { token: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("TOKEN SENT TO BACKEND:", token);
//       console.log("PASSWORD SENT:", !!password);

//       const response = await axiosInstance.post(
//         `${ENDPOINT.auth.resetPassword}`,
//         {
//           token,
//           password,
//         }
//       );

//       console.log("RESET PASSWORD API RESPONSE:", response.data);

//       return response.data;
//     } catch (error) {
//       console.error("RESET PASSWORD API ERROR:", error);

//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

export const resetPassword = createAsyncThunk(
  "reset-password/slice",
  async (
    { token, password }: ResetPasswordType & { token: string },
    { rejectWithValue },
  ) => {
    try {
      console.log("TOKEN SENT TO BACKEND:", token);
      console.log("PASSWORD SENT:", !!password);

      const response = await axiosInstance.post(
        `${ENDPOINT.auth.resetPassword}`,
        {
          token,
          password,
        },
      );

      console.log("RESET PASSWORD API RESPONSE:", response.data);

      return response.data;
    } catch (error) {
      // console.error("RESET PASSWORD API ERROR:", error.response?.data || error);

      return rejectWithValue(getErrorMessage(error))
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
        console.log("action from builder register", action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register =
          (action.payload as string) || "something went wrong";
      })

      .addCase(verifyEmailUser.pending, (state) => {
        state.loading.verifyEmail = true;
        state.error.verifyEmail = null;
      })
      .addCase(verifyEmailUser.fulfilled, (state, action) => {
        state.loading.verifyEmail = false;
        state.error.verifyEmail = null;

        console.log("VERIFY FULFILLED PAYLOAD:", action.payload);
      })
      .addCase(verifyEmailUser.rejected, (state, action) => {
        state.loading.verifyEmail = false;
        state.error.verifyEmail =
          (action.payload as string) || "something went wrong";

        console.log("VERIFY REJECTED PAYLOAD:", action.payload);
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
        state.error.login =
          (action.payload as string) || "something went wrong";
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading.forgotPassword = true;
        state.error.forgotPassword = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading.forgotPassword = false;
        state.error.forgotPassword = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading.forgotPassword = false;
        state.error.forgotPassword =
          (action.payload as string) || "something went wrong";
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading.resetPassword = true;
        state.error.resetPassword = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading.resetPassword = false;
        state.error.resetPassword = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading.resetPassword = false;
        state.error.resetPassword =
          (action.payload as string) || "something went wrong";
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
        state.error.logout =
          (action.payload as string) || "something went wrong";
      });
  },
});

export default authSlice.reducer;
