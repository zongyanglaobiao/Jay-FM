export function parseFlacFIle(song) {
	console.log(song)
	console.log(song.duration.toFixed(2))
	return 	{
		duration: song.duration.toFixed(2)
	}
}