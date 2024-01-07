import {serviceAxios} from "../http/httpRequest";


/**
 *
 * @param id
 * @param name
 * @param color
 * @param textDescribe
 * @param creator
 * @param email
 * @param enableDelete
 * @param enableModify
 * @returns {{creator, color, name, id, textDescribe, enableModify, email, enableDelete}}
 */
export function songListInfoParam(id,name, color, textDescribe, creator, email, enableDelete, enableModify){
	return {
		id,
		name,
		color,
		textDescribe,
		creator,
		email,
		enableDelete,
		enableModify
	}
}


/**
 * 删除歌单
 * @param {array} params string
 * @returns
 */
export function deleteSongList(params) {
	return  serviceAxios({
		url:`/song/list/delete`,
		method: 'post',
		data: params
	})
}


/**
 * 查询歌单中歌曲
 * @param {string} listId
 * @returns
 */
export function querySongList(listId) {
	return  serviceAxios({
		method:'get',
		url:`/song/list/list/${listId}`,
		params:{}
	})
}

/**
 * 保存-修改
 * @param {object} params SongListInfoEntity_NOT_IGNORE
 * @param {boolean} params.enableModify
 * @param {boolean} params.enableDelete
 * @param {string} params.id
 * @param {string} params.name
 * @param {string} params.color
 * @param {string} params.textDescribe
 * @param {string} params.creator
 * @param {string} params.email
 * @returns
 */
export function saveOrModifySongList(params) {
	return serviceAxios({
		method: 'post',
		url: '/song/list/save',
		data: params
	})
}

/**
 * 查询歌单
 * @param {object} params 搜索歌曲参数
 * @param {string} params.keyword 关键词搜索
 * @returns
 */
export function querySongListByKey(params) {
	return serviceAxios({
		method: 'post',
		url: 'song/list/search',
		data: params
	})
}

/**
 * 查询所有歌单
 */
export function   getAllSongList() {
	return serviceAxios({
		method: 'post',
		url: 'song/list/search',
		data: {keyword: ""}
	})
}
