import {lazy} from "react";


const MusicPlayer = lazy(()=> import("../components/MusicPlayer/MusicPlayer"))
const Folder = lazy(()=> import("../components/SongManagement/SongManagement"))
const TestPage = lazy(()=> import("../container/Pages/Test/TestPage"))
export const routes = [
    {
        path: '/manage',
        element: <Folder/>,
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
