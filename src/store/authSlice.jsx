import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userRole: localStorage.getItem("userRole") || null,
  profileId: localStorage.getItem("profileId") || null,
  isLoginModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, userRole, profileId, userId } = action.payload;
      state.token = token;
      state.userRole = userRole;
      state.profileId = profileId;
      state.userId = userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("profileId", profileId);
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userRole = null;
      state.profileId = null;
      state.userId = null;
      // 🗑 Xóa khỏi LocalStorage khi logout
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("profileId");
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  openLoginModal,
  closeLoginModal,
} = authSlice.actions;
export default authSlice.reducer;
