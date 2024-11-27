import { createSlice } from "@reduxjs/toolkit";

const toggleSidebarSlice = createSlice({
  name: "toggleSidebarSlice",
  initialState: {
    isOpenSidebar: false,
    categoryId:0
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpenSidebar = !state.isOpenSidebar;
    },
    closeSidebar: (state) => {
      state.isOpenSidebar = false;
    },
    updateCategory: (state,action) => {
      state.categoryId = action.payload
    }
  },
});

export const { toggleSidebar, closeSidebar, updateCategory } =
  toggleSidebarSlice.actions;

export default toggleSidebarSlice.reducer;
