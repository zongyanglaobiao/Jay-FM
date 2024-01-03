import {serviceAxios} from "../http/httpRequest";


export const createUploadSongParam = (singer,songName,uploader,email,songFile,folderId) => ({
	"singer": singer,
	"songName": songName,
	"lyrics": null,
	"translatedLyrics": null,
	"enableDownload": true,
	"enableModify": true,
	"enableDelete": true,
	"uploader": uploader,
	"email": email,
	"songFile": songFile,
	"folderId":folderId
})

/**
 * 上传歌曲
 * @param param
 */
export  const uploadSong =  (param) => {
	return serviceAxios({
		url: "/song/add",
		method: "post",
		data: param,
		headers:{
			"Content-Type": "multipart/form-data"
		}
	})
}
