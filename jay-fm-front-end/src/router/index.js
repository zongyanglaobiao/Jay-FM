import {lazy} from "react";


const MusicPlayer = lazy(()=> import("../components/MusicPlayer/MusicPlayer"))
const Folder = lazy(()=> import("../components/SongManagement/SongManagement"))
export const routes = [
    {
        path: '/folder',
        element: <Folder/>
    },
	{
		path: "/",
		element: <MusicPlayer/>
	},
	{
		path: "*",
		element: <MusicPlayer/>
	},
]
