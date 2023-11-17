import {createAsyncThunk} from "@reduxjs/toolkit";

/* ============================================ */
/* =================所有异步的thunk================= */
/* ============================================ */

/**
 * 发起请求添加卡片
 * @type {AsyncThunk<unknown, void, AsyncThunkConfig>}
 */
export const addCardThunk = createAsyncThunk('addCard',(cardInfo)=>{
	// todo 请求后端
	return cardInfo;
},);
