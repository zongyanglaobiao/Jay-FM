import {serviceAxios} from "../http/httpRequest";


export function songInfoParam(id,singer,songName,uploader,email,listId){
	return {
		"id": id,
		"singer": singer,
		"songName": songName,
		"lyrics": null,
		"translatedLyrics": null,
		"enableDownload": true,
		"enableModify": true,
		"enableDelete": true,
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
		params:songId
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
		params:id
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
	console.log('参数1',file)
	const formData = new FormData();
	formData.append('param',new Blob([JSON.stringify(params)],{type:'application/json'}));
	formData.append('file', file);
	console.log('参数2',formData.get("file"))
	// params.file = file
	return serviceAxios({
		url: `/song/save`,
		method: "post",
		headers:{
			//todo 调试接口
			'Content-Type': 'multipart/form-data'
		},
		data: formData,
	})
}
