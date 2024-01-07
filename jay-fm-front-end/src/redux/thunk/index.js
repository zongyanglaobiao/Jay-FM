import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllSongList} from "../../api/song-list-controller";

/**
 * 发起请求获取所有列表
 */
export  const getAllCardThunk =  createAsyncThunk('getSongList',async ()=>{
	return await getAllSongList()
})

