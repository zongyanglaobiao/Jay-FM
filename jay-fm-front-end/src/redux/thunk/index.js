import {createAsyncThunk} from "@reduxjs/toolkit";
import {serviceAxios} from "../../http/httpRequest";

/* ======================================================= */
/* =================所有异步的thunk，请求层================= */
/* ======================================================= */

/**
 * 发起请求添加卡片
 */
export  const addCardThunk =  createAsyncThunk('addCard',async (param, {dispatch})=>{
	// const resp = await reqPostAsync("/card/add", param, globalConfig)
	await serviceAxios({
		method: 'post',
		url: '/card/add',
		data: param
	})
	dispatch(getAllCardThunk())
})

/**
 * 发起请求获取所有卡片
 */
export  const getAllCardThunk =  createAsyncThunk('getCard',async ()=>{
	return await serviceAxios({
		method: 'post',
		url: '/card/search',
		data: {}
	})
})


