import {composeWithDevTools} from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit";
import {addCardReducer, toggleBgColorReducer} from "./feature";

//存储状态
export const store = configureStore({
	reducer:{
		theme:toggleBgColorReducer,
		cardArray:addCardReducer
	},
	devTools:composeWithDevTools(),
	middleware : (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false
		})
	}
});
