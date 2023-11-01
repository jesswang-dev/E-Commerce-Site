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
    },
    userEditAddress: (state, action) => {
      const source = { address: action.payload }
      state.account = Object.assign(state.account, source);
    },
    userEditPhone: (state, action) => {
      const source = { tel: action.payload };
      state.account = Object.assign(state.account, source);
    }
  },
});

export const {userSignIn, userSignOut, userEditAddress, userEditPhone}= userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
