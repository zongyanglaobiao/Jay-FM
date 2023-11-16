import '../../index.css'
import {useSelector} from "react-redux";

/**
 * 侧边导航栏组件
 * @constructor
 */
export default function SideBarNav ({render}) {
   const {currentTheme} = useSelector(state => state.theme);
	return (
		<div className='bar-nav-ui' data-theme={currentTheme}  style={{height: '100%'}}>
			{
				//插槽
				render()
			}
		</div>
	)
}





