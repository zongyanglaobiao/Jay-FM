import {SideBarNav} from "../../components/SidebarNav/SideBarNav";
import '../../index.css'
import {SideBarNavIcon} from "../../components/SidebarNav/SideBarNavIcon";
import {useRoutes} from "react-router-dom";
import {routes} from "../../router";

export  function Home() {
    const router = useRoutes(routes);
    return (
        <div className='home'>
            <nav className='side-nav'>
                    <SideBarNav render={()=><SideBarNavIcon/>}/>
            </nav>
            <main className='home-main'>
                {router}
            </main>
        </div>
    )
}
