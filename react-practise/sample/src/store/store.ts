import { configureStore } from "@reduxjs/toolkit";
import { sampleReducer } from "./reducer.js";
import createSagaMiddleware from 'redux-saga';


export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: sampleReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});