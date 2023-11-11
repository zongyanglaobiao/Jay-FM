import {combineReducers, legacy_createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {changThemeReducer} from "./reducers";

const reducers = combineReducers({
    theme:changThemeReducer
});

//存储状态
export const store = legacy_createStore(reducers,composeWithDevTools())
