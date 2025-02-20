import { RouteObject } from "react-router-dom";
import Cart from './cart'
import { cartRoute } from "../../helpers/conts";

const cartRouter: RouteObject =
{
    path: cartRoute,
    element: <Cart/>
}
export default cartRouter