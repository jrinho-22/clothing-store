import { RouteObject } from "react-router-dom";
import Products from './categoryProducts.sass'
import { allProductsRoute, productsRoute } from "../../helpers/conts";
import CategoryProducts from "./categoryProducts";

const allProductsRouter: RouteObject =
{
    path: allProductsRoute,
    element: <CategoryProducts />
}
export default allProductsRouter