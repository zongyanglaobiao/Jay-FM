import {createAsyncThunk} from "@reduxjs/toolkit";
import {reqPostAsync} from "../../lib/common/requestUtil";

/* ============================================ */
/* =================所有异步的thunk================= */
/* ============================================ */

const globalConfig = {
	headers:{
		auth:'24c5a289-afe1-4e49-8163-2ca146a27c46'
	}
}
/**
 * 发起请求添加卡片
 */
export  const addCardThunk =  createAsyncThunk('addCardRequest',async (param)=>{
	return await reqPostAsync("/card/add",param,globalConfig)
})
