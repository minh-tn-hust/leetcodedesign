import {Counter} from "../domain/counterEntity";
import {getCounter, updateCounter} from "../presenter/counterAPIService";
import * as actionType from "./counterActionTypes";

const setCounterAction = (counter : Counter) => (dispatch: (arg0: { type: string; counter: Counter; }) => void) => {
    dispatch({type : actionType.SET_COUNTER, counter});
}

const getCounterAction = () => (dispatch: (arg0: { type: string; counter?: Counter; }) => void) => {
    dispatch({type : actionType.GET_COUNTER});
    return getCounter().then((counter) => {
        dispatch({type: actionType.GET_COUNTER_SUCCESS, counter});
    })
}

const updateCounterAction = (counter : Counter) => (dispatch: (arg0: { type: string; }) => void) => {
    dispatch({type : actionType.UPDATE_COUNTER});

    return updateCounter(counter).then((counter) => {
        dispatch({type : actionType.UPDATE_COUNTER_SUCCESS});

        return counter;
    })
}

export {setCounterAction, getCounterAction, updateCounterAction};


