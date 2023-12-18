import useMessage from "antd/es/message/useMessage";
import {isNullOrUndefined} from "../../lib/common/util";

/**
 * 通用组件弹窗
 * @constructor
 */
export const SUCCESS = "success"
export const ERROR = "error"
export const WARNING = "warning"
export  default  function PopUp({callback}) {
	const [alert,contextHolder] = useMessage()

    const click = (type,msg) =>{
		alert.open({
			type: type,
			content: msg,
		});
	}

	if (!isNullOrUndefined(callback)) {
		//回调回调函数
		callback(click)
	}

	return (
		<>
			{contextHolder}
		</>
	);
}
