import {createSlice} from "@reduxjs/toolkit";

export const AUTHEN_ROLE = {
    ADMIN : "admin",
    MEMBER : "member"
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState : {
        role : AUTHEN_ROLE.ADMIN
    },
    reducers : {
    },
    extraReducers : (builder) => {
    }
})


export default authenticationSlice.reducer;