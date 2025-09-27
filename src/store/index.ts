
import {createSlice} from '@reduxjs/toolkit';

let initialState={
    isShareOpen:false,
    isFormOpen:false
}


export interface StoreInterface{
    isShareOpen:boolean,
    isFormOpen:boolean
}
let slice=createSlice({
name:'modal',
initialState:initialState,
reducers:{
    openShare: (state) => {
      state.isShareOpen = true;
    },
    closeShare: (state) => {
      state.isShareOpen = false;
    },
    openForm: (state) => {
      state.isFormOpen = true;
    },
    closeForm: (state) => {
      state.isFormOpen = false;
    },
}   
})


export const {closeShare,openShare,openForm,closeForm} = slice.actions;
export default slice.reducer;
