import {serviceAxios} from "../http/httpRequest";


export const createUploadSongParam = (singer,songName,uploader,email,songFile) => ({
	"singer": singer,
	"songName": songName,
	"lyrics": null,
	"translatedLyrics": null,
	"enableDownload": true,
	"enableModify": true,
	"enableDelete": true,
	"uploader": uploader,
	"email": email,
	"songFile": songFile
})

/**
 * 上传歌曲
 * @param param
 */
export  const uploadSong =  (param) => {
	return serviceAxios({
		url: "/song/addCardInfo",
		method: "post",
		data: param
	})
}
