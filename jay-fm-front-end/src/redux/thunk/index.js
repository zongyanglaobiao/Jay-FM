import {createAsyncThunk} from "@reduxjs/toolkit";
import {reqPostAsync} from "../../lib/common/requestUtil";

/* ======================================================= */
/* =================所有异步的thunk，请求层================= */
/* ======================================================= */

const globalConfig = {
	headers:{
		auth:'24c5a289-afe1-4e49-8163-2ca146a27c46'
	}
}
/**
 * 发起请求添加卡片
 */
export  const addCardThunk =  createAsyncThunk('addCard',async (param, {dispatch})=>{
	const resp = await reqPostAsync("/card/add", param, globalConfig)
	dispatch(getAllCardThunk())
})

/**
 * 发起请求获取所有卡片
 */
export  const getAllCardThunk =  createAsyncThunk('getCard',async ()=>{
	return await reqPostAsync("/card/search",{},globalConfig)
})


