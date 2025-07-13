import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
  name: "UserAuth",
  initialState: {
    loginDetails: null,
  },
  reducers: {
    addLoginUser: (state, action) => {
      state.loginDetails = action.payload;
    },
    removeLoginUser: (state) => {
      state.loginDetails = null;
    },
  },
});
export const {addLoginUser , removeLoginUser} = userAuthSlice.actions;
export default userAuthSlice.reducer;
