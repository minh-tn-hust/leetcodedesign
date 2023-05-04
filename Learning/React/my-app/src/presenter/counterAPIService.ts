import httpClient from './httpClient';
import type {Counter} from "../domain/counterEntity";
import {create} from "../domain/coutnerModel";

const BASE_URL = 'counter';

function getCounter() : Promise<Counter> {
    return httpClient.get<number>(BASE_URL).then(res => create(res.data));
}

function updateCounter(counter : Counter) : Promise<Counter> {
    return httpClient.put<number>(BASE_URL, {count : counter.value}).then(res => create(res.data));
}

export {getCounter, updateCounter}