import {createSlice} from "@reduxjs/toolkit";
import ProblemSlot from "@/models/ProblemSlot";
import {getListProblemMockup} from "@/models/Mockup";

const listProblem = getListProblemMockup(20);

const problemSlice = createSlice({
    name: "problem",
    initialState : {
        listCategory : [
        ],
        /** @type Array<ProblemSlot> */ listProblem : JSON.parse(JSON.stringify(listProblem)),
    },
    reducers : {},
    extraReducers : (builder) => {
    }
})


export default problemSlice.reducer;
