import {serviceAxios} from "../http/httpRequest";

export const ENABLE = "1"
export const DISABLE = "0"

export function  numberToBoolean(number) {
	if (number === ENABLE) {
		return true
	}

	if
}

export function songInfoParam(id,singer,songName,uploader,email,listId,isDelete){
	return {
		"id": id,
		"singer": singer,
		"songName": songName,
		"lyrics": null,
		"translatedLyrics": null,
		"enableDownload": 1,
		"enableModify": 1,
		"enableDelete": isDelete,
		"uploader": uploader,
		"email": email,
		"listId":listId
	}
}

/**
 * 删除歌曲
 * @param {string} songId
 * @returns
 */
export function deleteSong(songId) {
	return serviceAxios({
		url: `/song/delete`,
		method: "get",
		params: {songId}
	})
}

/**
 * 下载歌曲
 * @param {string} id
 * @returns
 */
export function downloadSong(id) {
	return serviceAxios({
		url: `/song/download`,
		method: "get",
		params: {id}
	})
}

/**
 * 修改
 * @param {object} params 歌曲信息实体类_UPDATE
 * @param {boolean} params.enableModify
 * @param {boolean} params.enableDelete
 * @param {string} params.id
 * @param {string} params.songName
 * @param {string} params.singer
 * @param {string} params.lyrics
 * @param {number} params.likeCount
 * @param {string} params.translatedLyrics
 * @param {number} params.playCount
 * @param {boolean} params.enableDownload
 * @param {string} params.uploader
 * @param {string} params.downloadId
 * @param {string} params.email
 * @param {string} params.listId
 * @returns
 */
export function modifySong(params) {
	return serviceAxios({
		url: `/song/modify`,
		method: "post",
		data: params
	})
}

/**
 * 新增
 * @param file
 * @param {object} params 歌曲信息实体类_INSERT
 * @param {boolean} params.enableModify
 * @param {boolean} params.enableDelete
 * @param {string} params.songName
 * @param {string} params.singer
 * @param {string} params.lyrics
 * @param {number} params.likeCount
 * @param {string} params.translatedLyrics
 * @param {number} params.playCount
 * @param {boolean} params.enableDownload
 * @param {string} params.uploader
 * @param {string} params.downloadId
 * @param {string} params.email
 * @param {string} params.listId
 * @returns
 */
export function saveSong(file, params) {
	const formData = new FormData();
	formData.append('param',new Blob([JSON.stringify(params)],{type:'application/json'}));
	formData.append('file',new Blob([JSON.stringify(file)],{type:'multipart/form-data'}),file.name);
	// formData.append('file', file);
	console.log('',formData.get("file"))
	// params.file = file
	return serviceAxios({
		url: `/song/save`,
		method: "post",
		headers:{
			'Content-Type': 'multipart/form-data'
		},
		data: formData,
	})
}
