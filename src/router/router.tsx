import {
  HashRouter,
  Navigate,
  RouteObject,
  Routes,
  Route
} from "react-router-dom";
import homeRouter from "../views/home/router";
import productsRouter from "../views/products/router";
import { homeRoute } from "../helpers/conts";
import allProductsRouter from "../views/products-by-category/routes";
import cartRouter from "../views/cart/router";
import Skeleton from "../components/page/skeleton/skeleton";
import Login from "../views/login/login";
import checkoutRouter from "../views/checkout/router";

// Define routes
const defaultRoute: RouteObject = {
  path: "*",
  element: <Navigate to={homeRoute} replace />,
};

const emptyRoute: RouteObject = {
  path: "",
  element: <Navigate to={homeRoute} replace />,
};

const routes = [
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/',
    element: <Skeleton />,
    children: [
      homeRouter,
      cartRouter,
      productsRouter,
      allProductsRouter,
      checkoutRouter,
      emptyRoute,
      defaultRoute,
    ],
  },
];

// Use HashRouter instead of createBrowserRouter
const Router = () => (
  <HashRouter>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={child.path}
                element={child.element}
              />
            ))}
        </Route>
      ))}
    </Routes>
  </HashRouter>
);

export default Router;
