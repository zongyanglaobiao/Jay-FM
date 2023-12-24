import useMessage from "antd/es/message/useMessage";
import {isNullOrUndefined} from "../../lib/common/util";
import {useEffect} from "react";

/**
 * 通用组件弹窗
 * @constructor
 */
export const SUCCESS = "success"
export const ERROR = "error"
export const WARNING = "warning"
export  default  function PromptBox({alertMsg}) {
	const [alert,contextHolder] = useMessage()
	useEffect(() => {
		//参数不为null则会
		if (!isNullOrUndefined(alertMsg)) {
			const {type,msg} = alertMsg
			alert.open({
				type: type,
				content: msg,
			})
		}
	}, [alertMsg]);

	return (
		<>
			{contextHolder}
		</>
	);
}

export function httpStatus(resp) {
	const  {code,message} = resp
	let type = null
	switch (code) {
		case 200:{
			type = SUCCESS
			break
		}
		default:{
			type = ERROR
			break
		}
	}
	return createAlertMsg(type,message)
}

export function createAlertMsg(type,msg) {
	return {type,msg}
}
