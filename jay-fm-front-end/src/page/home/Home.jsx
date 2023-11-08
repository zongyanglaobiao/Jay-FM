import {SideBarNav} from "../../components/SidebarNav/SideBarNav";
import '../../index.css'
import {SideBarNavIcon} from "../../components/SidebarNav/SideBarNavIcon";
import {useRoutes} from "react-router-dom";
import {routes} from "../../router";

/**
 * 主页面，因为是SPA应用所以整个应用只有一个页面
 * @returns {JSX.Element}
 * @constructor
 */
export  function Home() {
    const router = useRoutes(routes);
    return (
        <div className='home'>
            <nav className='side-nav '>
                    <SideBarNav render={()=><SideBarNavIcon/>}/>
            </nav>
            <main className='home-main'>
                <div className='home-container'>
                    {router}
                </div>
            </main>
        </div>
    )
}
