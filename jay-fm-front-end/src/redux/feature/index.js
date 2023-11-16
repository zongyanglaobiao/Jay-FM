import {generateSlice} from "../../utils/reduxUtil";
/* ============================================ */
/* =================总Slice文件================= */
/* ============================================ */
export const LIGHT = 'light';
export const DARK = 'dark';
export const createThemeObj = (currentTheme = LIGHT,isDark = false) => {
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


//导出action
export const {toggleColor} = toggleBgColorSlice.actions
//导出reducer
export const toggleBgColorReducer = toggleBgColorSlice.reducer

/**
 * 添加卡片
 * @type {Slice<*, {}, *>}
 */
const addCardSlice = generateSlice('addCardSlice',[],{
	addCard:(state,action)=> {
		//todo 发起请求
		return [...state,action.payload]
	}
});

//导出action
export const {addCard} = addCardSlice.actions
//导出reducer
export const addCardReducer = addCardSlice.reducer
