import {combineReducers, legacy_createStore} from "redux";
import {colorSwatchHandler} from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
    colorSet:colorSwatchHandler
});

//存储状态
export const store = legacy_createStore(reducers,composeWithDevTools())
