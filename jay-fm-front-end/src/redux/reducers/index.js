// =======================================
// =========  总reducers =================
// =======================================
import {ADD_CARD, BACKGROUND_COLOR_SWITCHING} from "../../constant/constant";
import {commonReducer} from "../../utils/reduxUtil";
import {isNullOrUndefined} from "../../utils/util";

/**
 * 所有reducer初始化必须用这个值,如果需要初始值就要在UI层处理
 * @type {null}
 */
const  init = null

/**
 * 处理切换背景颜色
 * @param state
 * @param action
 * @returns {*|null}
 */
export function changThemeReducer(state = init,action) {
	return commonReducer(state,action,BACKGROUND_COLOR_SWITCHING,isDark => {
		if (isDark) {
			return {currentTheme:'dark',isDark}
		}else {
			return {currentTheme:'light',isDark}
		}
	})
}

/**
 * 添加卡片
 * @param state
 * @param action
 * @returns {*}
 */
export function addCardReducer(state = init,action) {
	return 	commonReducer(state,action,ADD_CARD,cardInfo => {
		if (isNullOrUndefined(state)) {
		   return [cardInfo]
		}else {
			return	[...state,cardInfo]
		}
	})
}


