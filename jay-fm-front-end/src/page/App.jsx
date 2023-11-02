import {Home} from "./home/Home";
import {Provider} from "react-redux";
import {store} from "../redux/store";

function App() {
  return (
      <Provider store={store}>
          <div>
              <Home/>
          </div>
      </Provider>
    
  );
}

export default App;
