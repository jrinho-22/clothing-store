import { Provider } from "react-redux";
import storeInstance from "./store/store";
import Router from "./router/router";

function App() {

  return (
    <Provider store={storeInstance}>
      <Router />
    </Provider>
  )
}

export default App
