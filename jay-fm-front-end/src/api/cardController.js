import {serviceAxios} from "../http/httpRequest";

/**
 * 音乐列表类
 */
export class CardInfo {
	id
	cardName
	color
	textDescribe
	creator
	email
	enableDelete
	enableModify

	/**
	 * 构造函数
	 * @param id
	 * @param cardName
	 * @param color
	 * @param textDescribe
	 * @param creator
	 * @param email
	 * @param enableDelete
	 * @param enableModify
	 */
	constructor(id,cardName, color, textDescribe, creator, email, enableDelete, enableModify) {
		this.id = id
		this.cardName = cardName
		this.color = color
		this.textDescribe = textDescribe
		this.creator = creator
		this.email = email
		this.enableDelete = enableDelete
		this.enableModify = enableModify
	}
}


/**
 * 发起请求添加音乐列表
 */
export  const addSongList =   (param) => {
	return  serviceAxios({
		method: 'post',
		url: '/card/add',
		data: param
	})
}

/**
 * 修改卡片
 * @param param
 * @returns {*}
 */
export  const modifySongList = (param) => {
	return  serviceAxios({
		method: 'post',
		url: '/card/modify',
		data: param
	})
}

export const deleteSongList = (param) => {
	return serviceAxios({
		method: 'get',
		url: '/card/delete',
		params: param
	})
}

/**
 * 获取所有列表
 */
export  const getAllCard =  ()=>{
	return  serviceAxios({
		method: 'post',
		url: '/card/search',
		data: {}
	})
}
