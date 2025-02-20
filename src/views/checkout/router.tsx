import { RouteObject } from "react-router-dom";
import Checkout from './checkout'
import { checkoutRoute } from "../../helpers/conts";

const checkoutRouter: RouteObject =
{
    path: checkoutRoute,
    element: <Checkout/>
}
export default checkoutRouter