import {lazy} from "react";


const MusicPlayer = lazy(()=> import("../components/MusicPlayer/MusicPlayer"))
export const routes = [
    {
        path: "/",
        element: <MusicPlayer/>
    },
    {
        path: "*",
        element: <MusicPlayer/>
    }
]