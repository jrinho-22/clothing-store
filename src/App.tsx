import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import { Provider } from "react-redux";
import storeInstance from "./store/store";
import Router from "./router/router";

function App() {

  // useEffect(() => {
  //   console.log('Component re-rendered');
  // }, []);
  return (
    <Provider store={storeInstance}>
      <Router />
    </Provider>
  )
}

export default App
