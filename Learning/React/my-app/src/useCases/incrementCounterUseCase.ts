import {updateCounterUseCase} from "./updateCounterUseCase";
import type {UpdateCounterUseCase} from "./updateCounterUseCase";
import {increment} from "../domain/coutnerModel";

const incrementCounterUseCase = (store : UpdateCounterUseCase) => {
    return updateCounterUseCase(store, increment)
}

export { incrementCounterUseCase}
