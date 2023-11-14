// =======================================
// =========  总actions  =================
// =======================================
import {ADD_CARD, BACKGROUND_COLOR_SWITCHING} from "../../constant/constant";

/**
 * 改变侧边栏主题颜色
 * @param data
 * @returns {{data, type: string}}
 */
export const changeThemeAction = (data) => ({type: BACKGROUND_COLOR_SWITCHING,data});


export const addCardAction = (data) => {
	//todo  执行网络操作
	return (dispatch) => {
		//执行分发给reducer处理
		dispatch(requestAction.success({type:ADD_CARD,data}));
	}
};

/**
 * 通用请求action
 * @param data
 * @returns {{data, type: string}}
 */
const  requestAction = {
	fail:(obj) => ({type:obj.type,data:obj.data}),
	success:(obj) => ({type:obj.type,data:obj.data})
}

