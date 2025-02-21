import { RouteObject } from "react-router-dom";
import { allProductsRoute } from "../../helpers/conts";
import CategoryProducts from "./categoryProducts";

const allProductsRouter: RouteObject =
{
    path: allProductsRoute,
    element: <CategoryProducts />
}
export default allProductsRouter