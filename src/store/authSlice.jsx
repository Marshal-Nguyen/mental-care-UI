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
      const { token, role, profileId, user_id } = action.payload;
      state.token = token;
      state.userRole = role;
      state.profileId = profileId;
      state.userId = user_id;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("profileId", profileId);
      localStorage.setItem("userId", user_id);
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userRole = null;
      state.profileId = null;
      state.userId = null;
      // 🗑 Xóa khỏi LocalStorage khi logout
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userImage");
      localStorage.removeItem("token");
      localStorage.removeItem("profileId");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
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
