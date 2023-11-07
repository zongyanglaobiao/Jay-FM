import {lazy} from "react";


const MusicPlayer = lazy(()=> import("../components/MusicPlayer/MusicPlayer"))
const Folder = lazy(()=> import("../components/Folder/Folder"))
export const routes = [
    {
        path: "/",
        element: <MusicPlayer/>
    },
    {
        path: "*",
        element: <MusicPlayer/>
    },
    {
        path: '/folder',
        element: <Folder/>
    }
]