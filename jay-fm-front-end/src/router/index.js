import {lazy} from "react";
import {Navigate} from "react-router-dom";


const MusicPlayer = lazy(()=> import("../components/MusicPlayer/MusicPlayer"))
const Folder = lazy(()=> import("../components/SongManagement/SongManagement"))
const TestPage = lazy(()=> import("../page/test/TestPage"))
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
		path: "/test",
		element:  <TestPage/>
	},
	{
		path: "*",
		element: <MusicPlayer/>
	},
]
