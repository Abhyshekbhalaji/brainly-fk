import {createSlice} from '@reduxjs/toolkit';
import type { dbItem } from '../db';

let initialState = {
    isShareOpen: false,
    isFormOpen: false,
    contentRefreshTrigger: 0, 
    contentData: [] as dbItem[],
    allContentData: [] as dbItem[]  // ✅ Added this to initialState
}

export interface StoreInterface {
    isShareOpen: boolean,
    isFormOpen: boolean,
    contentRefreshTrigger: number,
    contentData: dbItem[],
    allContentData: dbItem[]
}

let slice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
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
        refreshContent: (state) => {
            state.contentRefreshTrigger += 1;
        },
        updateContent: (state, action) => {
            state.contentData = action.payload;
        },
        setAllContentData: (state, action) => {  // ✅ Now this will work
            state.allContentData = action.payload;
        }
    }   
})

export const {
    closeShare, 
    openShare, 
    openForm, 
    closeForm, 
    refreshContent,
    updateContent,
    setAllContentData  // ✅ Added this to exports
} = slice.actions;

export default slice.reducer;