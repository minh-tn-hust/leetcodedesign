import type {CounterStore} from "../domain/counterStore";

import * as actionType from "./counterActionTypes"

type CounterStoreState = Omit<CounterStore, "update" | "getCounters">

const INITIAL_STATE: CounterStoreState = {
    counter: undefined,
    isLoading: false,
    isUpdating: false,
};

const counterReducer = (state : CounterStore = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_COUNTER:
            return {...state, counter: action.counter};
    }
}

export {counterReducer};

export type {CounterStoreState}