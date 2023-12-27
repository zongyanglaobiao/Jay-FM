import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllCard} from "../../api/cardController";

/* ======================================================= */
/* =================所有异步的thunk       ================= */
/* ======================================================= */



/**
 * 发起请求获取所有列表
 */
export  const getAllCardThunk =  createAsyncThunk('getCard',async ()=>{
	return await getAllCard()
})

