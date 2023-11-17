import {generateSlice} from "../../utils/reduxUtil";
import {addCardThunk} from "../thunk";
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
			return   createThemeObj()
		}
	}
})

/**
 * 添加卡片
 * @type {Slice<*, {}, *>}
 */
const addCardSlice = generateSlice('addCardSlice'
	,[]
	,{}
	,(builder)=>{
	builder
		.addCase(addCardThunk.fulfilled,(state,action)=>[...state,action.payload])
		.addCase(addCardThunk.rejected,()=>{
		console.log('thunk rejected')
	})
});

/**
 * 导出action
 */
export const {toggleColor} = toggleBgColorSlice.actions

/**
 * 导出reducer
 */
export const addCardReducer = addCardSlice.reducer
export const toggleBgColorReducer = toggleBgColorSlice.reducer

