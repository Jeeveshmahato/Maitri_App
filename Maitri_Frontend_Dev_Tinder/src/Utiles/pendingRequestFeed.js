import { createSlice } from "@reduxjs/toolkit";

const pendingRequestSlice = createSlice({
  name: "pendingRequests",
  initialState: {
    pendingRequests: null,
  },
  reducers: {
    addPendingRequests: (state, action) => {
      state.pendingRequests = action.payload;
    },
    removePendingRequests: (state, action) => {
      state.pendingRequests = state.pendingRequests.filter(
        (res) => res._id !== action.payload
      );
    },
  },
});
export const { addPendingRequests, removePendingRequests } =
  pendingRequestSlice.actions;

export default pendingRequestSlice.reducer;
