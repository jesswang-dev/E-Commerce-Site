import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {},
  isSignnedIn: false,
  shoppingCart: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignIn: (state, action) => {
        state.account = action.payload;
        state.isSignnedIn = true;
    },
    userSignOut: (state) => {
        state.account = {};
        state.isSignnedIn = false;
    }
  },
});

export const {userSignIn, userSignOut}= userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
