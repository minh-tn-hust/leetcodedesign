import React, {useCallback} from "react";

import type {CounterStore} from "../domain/counterStore";
import {getCounterUseCase} from "../useCases/getCounterUseCase";
import {incrementCounterUseCase} from "../useCases/incrementCounterUseCase";
import {decrementCounterUseCase} from "../useCases/decrementCounterUseCase.js";

function useCounterViewModel(store: CounterStore) {
    const getCounter = useCallback(
        function () {
            getCounterUseCase({
                loadInitialCounter: store.loadInitialCounter
            });
        },
        [store.loadInitialCounter]
    );

    const incrementCounter = useCallback(
        function () {
            incrementCounterUseCase({
                counter: store.counter,
                updateCounter: store.updateCounter,
                setCounter: store.setCounter
            });
        },
        [store.counter, store.updateCounter, store.setCounter]
    );

    const decrementCounter = useCallback(
        function() {
            decrementCounterUseCase({
                counter : store.counter,
                updateCounter : store.updateCounter,
                setCounter : store.setCounter
            })
        },
        []
    );

    return {
        count : store.counter?.value,
        shouldShowSpinner : typeof store.counter === 'undefined' || store.isLoading,
        shouldDisableButton : store.counter?.value === 0,
        getCounter,
        incrementCounter,
        decrementCounter
    }
}

export { useCounterViewModel }