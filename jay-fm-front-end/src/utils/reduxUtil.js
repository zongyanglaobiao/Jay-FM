/*======================================*/
/*===========redux工具类=================*/
/*======================================*/

import {connect} from "react-redux";
import {isNullOrUndefined, isObject, log} from "./util";


/**
 * 创建redux-react容器
 * @param mapStateToProps  把state转化为props
 * @param mapDispatchToProps  把dispatch转化为props
 * @param UIComponent  渲染组件
 * @param isLogState 是否打印
 * @param UIComponentName 打印标识符,建议是渲染组件的名字
 * @returns {ConnectedComponent<*, Mapped<DistributiveOmit<GetLibraryManagedProps<*>, keyof Shared<{}, GetLibraryManagedProps<*>>> & {} & ConnectPropsMaybeWithoutContext<{} & GetProps<*>>>>}
 */
export function createReactReduxContainer(mapStateToProps,
								mapDispatchToProps,
								UIComponent,
								isLogState = false,
								UIComponentName) {
	//传递参数不能为空
	if (isNullOrUndefined(mapStateToProps)) throw new Error('mapStateToProps is required')
	if (isNullOrUndefined(mapDispatchToProps))  throw new Error('mapStateToProps is required')
	if (isNullOrUndefined(UIComponent))  throw new Error('UIComponent is required')

	return connect(state => {
		//是否打印
		if (isLogState) {
			log(`current render  ${UIComponentName} component's state = `,state)
		}

		//判断是否使用了简写方式{}
		if (isObject(mapStateToProps)) {
			return  mapStateToProps
		}

		//如果未使用简写方式就是用回调方式
		const returnObj = mapStateToProps(state)
		if (isObject(returnObj)) {
			return returnObj
		}else {
			throw  new Error('mapStateToProps  not return object')
		}
	},dispatch => {
		//判断是否使用了简写方式
		if (isObject(mapDispatchToProps)) {
			return  mapDispatchToProps
		}

		//如果未使用简写方式就是用回调方式
		const returnObj = mapDispatchToProps(dispatch)
		if (isObject(returnObj)) {
			return returnObj
		}else {
			throw  new Error('mapDispatchToProps  not return a object')
		}
	})(UIComponent);
}


