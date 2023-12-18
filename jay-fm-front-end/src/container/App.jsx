import {Home} from "./Pages/Home/Home";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {HashRouter} from "react-router-dom";
import React, {createContext, Suspense} from "react";
import Loading from "./Pages/Load/Loading";
import PopUp from "../components/PopUp/PopUp";

function App() {
	const Context = createContext(null);
	const call = (type,msg) => {}
	//弹窗的回调函数
	return (
		<HashRouter>
			<Suspense fallback={<Loading/>}>
				<Provider store={store}>
					<Context.Provider value={call}>
						<PopUp callback={call}/>
						<Home/>
					</Context.Provider>
				</Provider>
			</Suspense>
		</HashRouter>

	);
}
export default App;
