import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "@/reducers/authentication/authenticationReducer";
import problemReducer from "@/reducers/problem/problemReducer";
import {createWrapper} from "next-redux-wrapper";

const reducers = combineReducers(
    {
        authentication: authenticationReducer,
        problem: problemReducer,
    }
);

const makeStore = () => configureStore({
    reducer : reducers
});

export const wrapper = createWrapper(makeStore);

