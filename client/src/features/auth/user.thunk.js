import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("eg_token", response.data.token);
      }
      toast.success("Welcome back!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      // Don't toast if it's the "Email not verified" case, we handle that in the UI
      if (error.response?.status !== 403) {
        toast.error(message);
      }
      return rejectWithValue(error.response?.data || { message });
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verify-otp", data);
      if (response.data.token) {
        localStorage.setItem("eg_token", response.data.token);
      }
      toast.success("Account verified successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Verification failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/resend-otp", { email });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to resend OTP";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      toast.success(response.data.message || "Password reset OTP sent to your email!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send reset email";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "user/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/reset-password", { email, otp, newPassword });
      toast.success(response.data.message || "Password reset successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to reset password";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user");
    }
  }
);

export const updateProfileSettings = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.put("/auth/update-profile", formData);
      toast.success(response.data.message || "Profile updated successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update profile";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const requestEmailCodeUser = createAsyncThunk(
  "user/requestEmailCode",
  async (newEmail, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/request-email-code", { newEmail });
      toast.success(response.data.message || "Verification code sent to your new email!");
      if (response.data?.devCode) {
        toast(`Verification Code: ${response.data.devCode}`, { icon: "🔑", duration: 8000 });
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send verification code";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateEmailUser = createAsyncThunk(
  "user/updateEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const data = typeof payload === "string" ? { newEmail: payload } : payload;
      const response = await api.put("/auth/update-email", data);
      toast.success(response.data.message || "Email updated successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update email";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const requestUpdatePhoneCodeUser = createAsyncThunk(
  "user/requestUpdatePhoneCode",
  async (newPhone, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/request-update-phone-code", { newPhone });
      toast.success(response.data.message || "SMS verification code sent to your new phone!");
      if (response.data?.devCode) {
        toast(`Verification Code: ${response.data.devCode}`, { icon: "🔑", duration: 8000 });
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send SMS verification code";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updatePhoneUser = createAsyncThunk(
  "user/updatePhone",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put("/auth/update-phone", payload);
      toast.success(response.data.message || "Phone number updated successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update phone number";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const requestPasswordCodeUser = createAsyncThunk(
  "user/requestPasswordCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/request-password-code");
      toast.success(response.data.message || "Verification code sent to your email!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send verification code";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const requestPhoneCodeUser = createAsyncThunk(
  "user/requestPhoneCode",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/request-phone-code", { phoneNumber });
      toast.success(response.data.message || "SMS verification code sent to your phone!");
      if (response.data?.devCode) {
        toast(`Verification Code: ${response.data.devCode}`, { icon: "🔑", duration: 8000 });
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send SMS verification code";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const changePasswordUser = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/change-password", data);
      toast.success(response.data.message || "Password changed successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to change password";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteAccountUser = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/auth/delete-account");
      localStorage.removeItem("eg_token");
      toast.success(response.data.message || "Account deleted successfully");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete account";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/logout");
      localStorage.removeItem("eg_token");
      return response.data;
    } catch (error) {
      localStorage.removeItem("eg_token");
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

