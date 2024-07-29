import { createSlice } from "@reduxjs/toolkit";

const initialState = {userInfo: 
  localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
};
// In this slice we want to manage the state of 
// User Information (e.g. name, email, ...) for authentication.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // once we get the "data" back in 
    // "usersApiSlice" then we want call setCredentials.
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    removeCredentials: (state, action) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
    }
  }
});

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer
