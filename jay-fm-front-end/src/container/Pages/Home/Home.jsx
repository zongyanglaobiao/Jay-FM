import SideBarNav from "../../../components/SidebarNav/SideBarNav";
import '../../../index.css'
import SideBarNavIcon from "../../../components/SidebarNav/SideBarNavIcon";
import {useRoutes} from "react-router-dom";
import {routes} from "../../../router";
import PromptBox from "../../../components/PromptBox/PromptBox";
import React, {createContext, useState} from "react";

/**
 * 主页面，因为是SPA应用所以整个应用只有一个页面
 * @returns {JSX.Element}
 * @constructor
 */
export const AlertContext = createContext(null);

export  function Home() {
    const router = useRoutes(routes);
	//弹窗的状态
	const [alertMsg, setAlert] = useState(null);
    return (
        <div className='home'>
            <nav className='side-nav '>
                    <SideBarNav render={()=><SideBarNavIcon/>}/>
            </nav>
            <main className='home-main'>
				<AlertContext.Provider value={setAlert}>
					<PromptBox alertMsg={alertMsg}/>
					<div className='home-container'>
						{router}
					</div>
				</AlertContext.Provider>
            </main>
        </div>
    )
}
