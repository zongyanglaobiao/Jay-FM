import {Home} from "./home/Home";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {HashRouter} from "react-router-dom";
import React, {Suspense} from "react";
import Loading from "./load/Loading";

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
