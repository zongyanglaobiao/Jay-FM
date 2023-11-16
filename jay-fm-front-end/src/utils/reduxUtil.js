import {createSlice} from "@reduxjs/toolkit";
import {isObject} from "./util";


/**
 *
 * @param name slice的名字
 * @param initialState 初始值
 * @param reducers reducer是一个对象
 * @param extraReducersCallback   回调函数用于extraReducers，有一个参数builder，用于创建缓冲器
 * @returns {Slice<unknown, SliceCaseReducers<unknown>, string>}
 */
const intiFunction = () => {}
export const generateSlice = (name,
							  initialState,
							  reducers,
							  extraReducersCallback = intiFunction) => {
	if (!isObject(reducers)) {
		throw new Error("reducers is not an object");
	}
	return createSlice({
		name:name,
		initialState:initialState,
		reducers:reducers,
		extraReducers:(builder) => {
			extraReducersCallback(builder)
		}
	})
};
