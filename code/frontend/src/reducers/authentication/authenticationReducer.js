import {createSlice} from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
    name: "authentication",
    initialState : {
        data : 1
    },
    reducers : {
    },
    extraReducers : (builder) => {
    }
})


export default authenticationSlice.reducer;