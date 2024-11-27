import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    cacheResult: {},
    searchResults:[],
  },
  reducers: {
    cacheSearchResult: (state, action) => {
      state.cacheResult = Object.assign(state.cacheResult, action.payload);
    },
    storeSearchResult: (state,action) => {
      state.searchResults = action.payload;
    }
  },
});

export const { cacheSearchResult, storeSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
