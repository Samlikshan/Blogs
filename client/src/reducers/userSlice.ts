import { logoutService } from "../api/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

interface UserState {
  isAuthenticated: boolean;

  userData: UserData | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      logoutService();
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUserData } = userSlice.actions;
export default userSlice.reducer;
