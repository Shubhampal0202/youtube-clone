import { configureStore } from "@reduxjs/toolkit";
import toggleSideReducer from "./toggleSidebarSlice";
import searchSliceReducer from "./searchSlice";
const store = configureStore({
  reducer: {
    toggleSidebar: toggleSideReducer,
    searchResult: searchSliceReducer,
  },
});
export default store;
 