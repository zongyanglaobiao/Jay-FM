import '../../index.css'
import {connect} from "react-redux";
/**
 * 侧边导航栏组件
 * @constructor
 */
export function BarNavUI ({render,colorSet}) {
    const {backgroundColor} = colorSet.data
  return (
      <div className='side-nav' style={{backgroundColor}}>
          {
              //插槽
              render()
          }
      </div>
  )
}

export const SideBarNav = connect(state => ({colorSet:state.colorSet}),{})(BarNavUI)




