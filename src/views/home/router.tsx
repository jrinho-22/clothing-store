import { RouteObject } from "react-router-dom";
import { homeRoute } from "../../helpers/conts";
import Home from "./home";

const homeRouter: RouteObject =
{
    path: homeRoute,
    element: <Home/>
}
export default homeRouter