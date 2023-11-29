import axios from "axios";
import {isNullOrUndefined} from "./util";

const URL = process.env.REACT_APP_PATH.replace(';','').replaceAll('\'','');
const POST = 'POST';
const GET = 'GET';
export const  reqUtil = (url,data = {},config = {},type = GET) => {

	//添加默认参数
	if (isNullOrUndefined(config.headers)) {
		config.headers = {};
	}

	if (isNullOrUndefined(config.headers['Content-Type'])) {
		config.headers['Content-Type'] = 'application/json;charset=utf-8'
	}

	//忽略结尾是否有斜杆“/”
	if (url.slice(0,1) === '/') {
		url = url.slice(1);
	}
	const ul = URL.concat(url)
	if (type === POST) {
		return axios.post(ul,data,config);
	}

	return axios.get(ul,{params:data,...config});
}

export const reqGetAsync =  (url,data,config) => {
	return reqUtil(url,data,config,GET).then((r) => r).catch(  (e)=>e)
}

export const reqPostAsync = (url,data,config) => {
	return reqUtil(url,data,config,POST).then((r) => r).catch(  (e)=>e)
}
