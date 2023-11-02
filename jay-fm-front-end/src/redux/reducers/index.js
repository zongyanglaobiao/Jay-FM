// =======================================
// =========  总reducers =================
// =======================================
import {BACKGROUND_SWITCHING} from "../../utils/constant";

const initColor = {
    data:{
        backgroundColor:'var(--default-background-color)'
    }
}
export function colorSwatchHandler(prev = initColor,obj) {
    const {type,data} = obj;
    if (type === BACKGROUND_SWITCHING) {
        return {data}
    }else {
        return prev;
    }
}