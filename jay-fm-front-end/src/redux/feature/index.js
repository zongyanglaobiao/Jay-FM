import {generateSlice} from "../../lib/common/reduxUtil";
import {getAllCardThunk, modifyCardThunk} from "../thunk";
import {CardInfo} from "../../constant/constant";
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
		.addCase(getAllCardThunk.fulfilled,(state,{payload})=>{
			return payload.data.records.map(item=>{
				const {cardName,color,textDescribe,creator,email,enableDelete,enableModify,id} = item
				return new CardInfo(id,cardName,color,textDescribe,creator,email,enableDelete,enableModify);
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

