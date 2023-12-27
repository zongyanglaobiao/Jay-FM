export function parseFlacFile(song) {
	/*console.log(song)
	console.log(song.duration.toFixed(2))
	return 	{
		duration: song.duration.toFixed(2)
	}*/
}

const  DOT = '.'
const  UNDER_LINE = '_'
export function parseFileName(fileName) {
	const index = fileName.lastIndexOf(DOT)

	if (index === -1) {
		throw  new Error(`${fileName}文件后缀名不正确`)
	}

	const nameArr = fileName.slice(0,index).split(UNDER_LINE)

	if (nameArr.length !== 2) {
		throw  new Error(`${fileName}文件名格式不正确，文件名格式[歌曲名_歌手名]`)
	}

	return {
		singer: nameArr[1],
		songName: nameArr[0]
	}
}
