import { createSlice } from "@reduxjs/toolkit";
const followersSlice = createSlice({
  name: "followers",
  initialState: {
    followers: [],counter:true,
  },
  reducers: {
    setFollowers: (state, action) => {
      console.log("Action", action.payload);
      state.followers = action.payload;
    },
    createNewFollowed: (state, action) => {
      state.followers.push(action.payload);
    },
    deleteFollowers: (state, action) => {
      state.followers = state.followers.filter(
        (elem) => elem.id !== action.payload.id
      );
    },
    updateCounter:(state,action)=>{
      state.counter = false;
    }
  }
});
export const { setFollowers, createNewFollowed, deleteFollowers,updateCounter } =
  followersSlice.actions;
export default followersSlice.reducer;
