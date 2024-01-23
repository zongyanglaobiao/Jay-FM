import {composeWithDevTools} from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit";
import {songListReducer, toggleBgColorReducer} from "./feature";

//存储状态
export const store = configureStore({
	reducer:{
		theme:toggleBgColorReducer,
		songList:songListReducer
	},
	devTools:composeWithDevTools(),
	middleware : (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false
		})
	}
});
