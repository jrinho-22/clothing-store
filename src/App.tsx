import { Provider } from "react-redux";
import storeInstance from "./store/store";
import Router from "./router/router";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={storeInstance}>
        <Router />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
