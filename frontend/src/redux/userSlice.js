import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,  // fecthing start
  error: false,
};

// dispatcher 
//contains all reducer function
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    // fecthing start : no action curently
    loginStart: (state) => {
      state.loading = true;
    },

    // fecthing done : do action
    // make credentials = users
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },

     // return initial state
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
