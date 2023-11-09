// =======================================
// =========  总reducers =================
// =======================================
import {BACKGROUND_SWITCHING} from "../../constant/constant";

const initColor = {
	backgroundColor:'var(--default-background-color)'
}

const initCard = []

/**
 * 背景颜色切换
 * @param prev
 * @param obj
 * @returns {{data: {backgroundColor: string}}|{data}}
 */
export function colorSwatchHandler(prev = initColor,obj) {
	console.log('@@@@@@',prev)
    const {type,data} = obj;
    if (type === BACKGROUND_SWITCHING) {
        return {data}
    }else {
        return prev;
    }
}


/*export function addCard(prev = initCard,obj) {
	const {type,data} = obj;
	if (type === BACKGROUND_SWITCHING) {
		return [...prev,data]
	}else {
		return prev;
	}
}*/

export function common(prev,obj,wantType,callback) {
	const {type,data} = obj;
	if (wantType === type) {
		return callback(data)
	}else {
		console.log('common',prev)
		return prev
	}
}
