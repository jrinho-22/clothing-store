import {
  createBrowserRouter,
  Navigate,
  RouteObject,
} from "react-router-dom";
import Home from "../views/home/home";
import Products from "../views/products/products";
import homeRouter from "../views/home/router";
import productsRouter from "../views/products/router";
import { cartRoute, homeRoute } from "../helpers/conts";
import allProductsRouter from "../views/products-by-category/routes";
import cartRouter from "../views/cart/router";
import Skeleton from "../components/page/skeleton/skeleton";
import Login from "../views/login/login";
import checkoutRouter from "../views/checkout/router";

const defaultRoute: RouteObject =
{
  path: "*",
  element: <Navigate to={homeRoute} replace />,
}

const emptyRoute: RouteObject =
{
  path: "",
  element: <Navigate to={homeRoute} replace />,
}

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
      defaultRoute
    ],
  },
]

const Router = createBrowserRouter([
  ...routes
]);

export default Router 