import { RouteObject } from "react-router-dom";
import Home from './home'
import { homeRoute } from "../../helpers/conts";

const homeRouter: RouteObject =
{
    path: homeRoute,
    element: <Home/>
}
export default homeRouter