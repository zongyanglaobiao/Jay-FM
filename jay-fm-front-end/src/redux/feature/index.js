import {generateSlice} from "../../lib/common/reduxUtil";
import {songListInfoParam} from "../../api/song-list-controller";
import {getAllSongListThunk} from "../thunk";
import {isNullOrUndefined} from "../../lib/common/util";

/* ============================================ */
/* =================总Slice文件================= */
/* ============================================ */

const LIGHT = 'light';
const DARK = 'dark';
const createThemeObj = (currentTheme = LIGHT,isDark = false) => {
    return {
        currentTheme:currentTheme,
        isDark:isDark
    }
}
/**
 * 切换背景颜色
 * @type {Slice<{currentTheme: string}, {toggleColor: reducers.toggleColor}, string>}
 */
const toggleBgColorSlice = generateSlice('toggleBgColorSlice',createThemeObj(),{
	toggleColor:(state,{payload}) => {
		if (payload) {
			return createThemeObj(DARK,true)
		}else {
			return createThemeObj()
		}
	}
})

/**
 * 添加卡片
 * @type {Slice<*, {}, *>}
 */
const cardSlice = generateSlice('cardSlice'
	,[]
	,{}
	,(builder)=>{
	builder
		//获取所有列表
		.addCase(getAllSongListThunk.fulfilled,(state,{payload})=>{
			console.log('payload',payload)
			if (isNullOrUndefined(payload)) {
				return []
			}
			return payload.data.records.map(item=>{
				const {name,color,textDescribe,creator,email,enableDelete,enableModify,id} = item
				return songListInfoParam(id,name,color,textDescribe,creator,email,enableDelete,enableModify);
			})
		})
});


/**
 * 导出action
 */
export const {toggleColor} = toggleBgColorSlice.actions
/**
 * 导出reducer
 */
export const songListReducer = cardSlice.reducer
export const toggleBgColorReducer = toggleBgColorSlice.reducer

