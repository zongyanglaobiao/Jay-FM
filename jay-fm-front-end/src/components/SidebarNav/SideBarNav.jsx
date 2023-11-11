import '../../index.css'
import {isNullOrUndefined} from "../../utils/util";
import {createReactReduxContainer} from "../../utils/reduxUtil";

/**
 * 侧边导航栏组件
 * @constructor
 */
export function BarNavUI ({render,theme}) {
	console.log(theme)
	return (
		<div className='bar-nav-ui' data-theme={isNullOrUndefined(theme) ? 'light' : theme.currentTheme}  style={{height: '100%'}}>
			{
				//插槽
				render()
			}
		</div>
	)
}

export const SideBarNav = createReactReduxContainer(state => ({theme:state.theme}), {}, BarNavUI);




