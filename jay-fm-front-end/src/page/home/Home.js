import {SideBarNav} from "../../components/SidebarNav/SideBarNav";
import '../../index.css'
import {SideBarNavIcon} from "../../components/SidebarNav/SideBarNavIcon";

export  function Home() {
    return (
        <div className='home'>
            <nav>
                    <SideBarNav render={()=><SideBarNavIcon/>}/>
            </nav>
            <main>

            </main>
        </div>
    )
}
