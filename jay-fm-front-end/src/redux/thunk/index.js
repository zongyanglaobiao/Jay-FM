import {createAsyncThunk} from "@reduxjs/toolkit";
import {serviceAxios} from "../../http/httpRequest";

/* ======================================================= */
/* =================所有异步的thunk，请求层================= */
/* ======================================================= */

/**
 * 发起请求添加音乐列表
 */
export  const addSongList =   (param) => {
	return  serviceAxios({
		method: 'post',
		url: '/card/add',
		data: param
	})
}

/**
 * 发起请求获取所有列表
 */
export  const getAllCardThunk =  createAsyncThunk('getCard',async ()=>{
	return await serviceAxios({
		method: 'post',
		url: '/card/search',
		data: {}
	})
})

export  const modifySongList = (param) => {
	return  serviceAxios({
		method: 'post',
		url: '/card/modify',
		data: param
	})
}


