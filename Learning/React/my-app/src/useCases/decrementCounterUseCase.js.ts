import {updateCounterUseCase} from "./updateCounterUseCase";
import type {UpdateCounterUseCase} from "./updateCounterUseCase";
import {decrement} from "../domain/coutnerModel";

const decrementCounterUseCase = (store : UpdateCounterUseCase) => {
    return updateCounterUseCase(store, decrement);
}

export { decrementCounterUseCase }