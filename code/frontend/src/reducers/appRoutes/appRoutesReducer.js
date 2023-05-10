import {createSlice} from "@reduxjs/toolkit";
import {Logger} from "@/shared/utilities";

let logger = function(message) {
    Logger.log("appRoutesReducer: ", message);
}
export const ROUTES = {
    HOME_PAGE : "homepage",
    LIST_PROBLEM : "listproblem",
    DOING : "listdoing"
}

const appRoutes = createSlice({
    name: "appRoutes",
    initialState : {
        currentRoutes : ROUTES.HOME_PAGE,
    },
    reducers : {
        changeToHomePage(state) {
            logger("CALLING CHANGE TO HOMEPAGE");
            state.currentRoutes = ROUTES.HOME_PAGE;
        },
        changeToListProblem(state) {
            logger("CALLING CHANGE TO LIST PROBLEM");
            state.currentRoutes = ROUTES.LIST_PROBLEM;
        },
        changeToProblemPage(state) {
            logger("CALLING CHANGE TO LIST DOING PAGE");
            state.currentRoutes = ROUTES.DOING;
        }
    },
    extraReducers : (builder) => {
    }
})


export const {changeToHomePage, changeToListProblem, changeToProblemPage} = appRoutes.actions
export default appRoutes.reducer;
