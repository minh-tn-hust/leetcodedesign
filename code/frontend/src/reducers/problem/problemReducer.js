import {createSlice} from "@reduxjs/toolkit";
import ProblemSlot from "@/models/ProblemSlot";
import {getListProblemMockup} from "@/models/Mockup";

const problemSlice = createSlice({
    name: "problem",
    initialState : {
        listCategory : [
        ],
        /** @type Array<ProblemSlot> */ listProblem : getListProblemMockup(20),
    },
    reducers : {},
    extraReducers : (builder) => {
    }
})


export default problemSlice.reducer;
