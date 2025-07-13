import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connectionSlice",
    initialState: {
        connectionSlice: null,
    },
    reducers: {
        addConnectionSlice: (state, action) => {
            state.connectionSlice = action.payload;
        },
        removeConnectionSlice: (state) => {
            state.connectionSlice = null;
        },
    },
 });
 export const { addConnectionSlice, removeConnectionSlice } = connectionSlice.actions;
 export default connectionSlice.reducer;