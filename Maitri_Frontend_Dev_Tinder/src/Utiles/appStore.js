import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuthSlice";
import userFeedReducer from "./userFeed";
import requestFeedReducer from "./pendingRequestFeed"
import connectionFeedReducer from "./connectionFeed"
const appStore = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    userFeed: userFeedReducer,
    requestFeed: requestFeedReducer,
    connectionFeed: connectionFeedReducer
  },
});

export default appStore;
