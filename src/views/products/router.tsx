import { RouteObject } from "react-router-dom";
import Products from './products'
import { productsRoute } from "../../helpers/conts";

const productsRouter: RouteObject =
{
    path: productsRoute,
    element: <Products />
}
export default productsRouter