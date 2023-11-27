import axios from "axios";

const URL = process.env.REACT_APP_PATH.replace(';','').replaceAll('\'','');
const POST = 'POST';
const GET = 'GET';
export const  reqUtil = (url,data = {},config = {},type = GET) => {
	if (url.slice(0,1) === '/') {
		url = url.slice(1);
	}
	const ul = URL.concat(url)
	if (type === POST) {
		return axios.post(URL.concat(ul),data,config);
	}
	return   axios.get(ul,{params:data},config);
}

export const reqGetAsync =  (url,data = {},config = {}) => {
	return reqUtil(url,data,config,GET).then((r) => r).catch(  (e)=>e)
}

export const reqPostAsync = (url,data = {},config = {}) => {
	return reqUtil(url,data,config,POST).then((r) => r).catch(  (e)=>e)
}
