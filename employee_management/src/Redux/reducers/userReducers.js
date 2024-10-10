import { createSlice } from "@reduxjs/toolkit";

// Retrieve userInfo from localStorage if it exists
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage, // Load userInfo from localStorage
  loading: false,
  error: null,
  successMessage: null, // Optional: store success state
};

// Redux slice for the user
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    errorState: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    successState: (state, action) => {
      state.successMessage = action.payload;
      state.error = null;
    },
    setPageLoader: (state, action) => {
      state.loading = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo"); // Clear localStorage on logout
    },
  },
});

export const { setUserInfo, errorState, successState, setPageLoader, userLogout } = userSlice.actions;
export const userReducer = userSlice.reducer;
