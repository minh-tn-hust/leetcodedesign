// @ts-ignore
import debounce from "lodash.debounce";

import type { Counter} from "../domain/counterEntity";
import type {CounterStore} from "../domain/counterStore";


type UpdateCounterUseCase = Pick<
    CounterStore,
    "counter" | "updateCounter" | "setCounter"
>;

const debouncedTask = debounce((task: () => any) => {
    return Promise.resolve(task());
}, 500);

const updateCounterUseCase = (
    store : UpdateCounterUseCase,
    updateBy : (counter : Counter) => Counter
) => {
    const updatedCounter = store.counter
        ? updateBy(store.counter)
        : store.counter;

    if (updatedCounter) {
        store.setCounter(updatedCounter);

        return debouncedTask(() => store.updateCounter(updatedCounter))
    }
};

export { updateCounterUseCase };
export type { UpdateCounterUseCase };
