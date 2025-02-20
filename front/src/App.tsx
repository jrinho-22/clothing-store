import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import storeInstance from "./store/store";
import TopMenu from "./components/page/topMenu/topMenu";

function App() {

  // useEffect(() => {
  //   console.log('Component re-rendered');
  // }, []);
  return (
    <Provider store={storeInstance}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
