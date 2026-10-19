import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  verifyOTP,
  fetchCurrentUser,
  updateProfileSettings,
  updateEmailUser,
  updatePhoneUser,
  deleteAccountUser,
  logoutUser
} from "./user.thunk";

const initialState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("eg_token") || null : null,
  isAuthenticated: false,
  loading: false,
  error: null,
  // Helper to know if we need to show the OTP screen
  requiresVerification: false,
  verificationEmail: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("eg_token");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
      state.requiresVerification = true;
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.requiresVerification = true;
      state.verificationEmail = action.payload.user.email;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.requiresVerification = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      // If the error object has isVerified: false, it means they need to verify OTP
      if (action.payload && action.payload.isVerified === false) {
        state.requiresVerification = true;
      } else {
        state.error = action.payload?.message || "Login failed";
      }
    });

    // Verify OTP
    builder.addCase(verifyOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.requiresVerification = false;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Current User
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("eg_token");
      }
    });

    // Update Profile Settings
    builder.addCase(updateProfileSettings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfileSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(updateProfileSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Email
    builder.addCase(updateEmailUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateEmailUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(updateEmailUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Phone
    builder.addCase(updatePhoneUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePhoneUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(updatePhoneUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete Account
    builder.addCase(deleteAccountUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccountUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
    builder.addCase(deleteAccountUser.rejected, (state) => {
      state.loading = false;
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logout, clearError, setVerificationEmail } = userSlice.actions;
export default userSlice.reducer;
