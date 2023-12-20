import {Home} from "./Pages/Home/Home";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {HashRouter} from "react-router-dom";
import React, {Suspense} from "react";
import Loading from "./Pages/Load/Loading";


function App() {
	return (
		<HashRouter>
			<Suspense fallback={<Loading/>}>
				<Provider store={store}>
					<Home/>
				</Provider>
			</Suspense>
		</HashRouter>

	);
}
export default App;
