import { useContext, useEffect, useState } from "react"
import PageBase from "../../components/page/page-base/pageBase"
import "./categoryProducts.sass"
import Produto from "../models/products"
import { IProduto } from "../../interfaces/IProduct"
import AllProducts from "./components/all-products/all-products"
import SIngleProducts from "./components/single-product/single-products"
import SearchComp from "./components/searchComp"
import useGetParam from "../../hooks/navigation"
import { filterRecord } from "../../hooks/useFilters"
import { MenuContext } from "../../components/page/skeleton/skeleton"
import { delay } from "../../helpers/general"

const CategoryProducts = () => {
    const SingleElement = () => {
        const menuContex = useContext(MenuContext)
        const productsModel = new Produto()
        const [renderProducts, setRenderProducts] = useState<IProduto[]>([]);
        const [singleProduct, setSingleProduct] = useState<IProduto | undefined>();
        const [loading, setLoading] = useState<boolean>(true);
        const { filter, label, field } = useGetParam<{ filter: filterRecord<IProduto>, label: string, field: keyof IProduto }>("state") ?? {};
        const [passParams, setPassParams] = useState(true)

        useEffect(() => {
            getAllProducts()
        }, [filter]);

        const getAllProducts = async () => {
            const products = filter
                ? await productsModel.get(filter)
                : await productsModel.get()
            setRenderProducts(products)
            setLoading(false)
        }

        const serachEmitterHandler = async (coll: IProduto[]) => {
            setLoading(true)
            setPassParams(false)
            setRenderProducts(coll)
            await delay(2000)
            setLoading(false)
        }

        const getParamsValues = () => {
            return filter
                && field
                && passParams
                && { field: field, value: filter[field]?.value }
                || undefined
        }

        const pageLabel = (): string => {
            return label
                ? label
                : "Products"
        }

        return (
            <div className={`all-products-wrapper ${!menuContex.menuState ? "expand" : ""}`}>
                <div className="floating-title">
                    <div>
                        {!label?.includes("Collection") && <h1>All</h1>}
                        <h1>{pageLabel()}</h1>
                    </div>
                </div>
                <div className="search-container">
                    <SearchComp paramsValue={getParamsValues()} collectionEmit={(coll) => serachEmitterHandler(coll)} />
                </div>
                {singleProduct
                    ? <SIngleProducts closeEmit={() => setSingleProduct(undefined)} product={singleProduct} />
                    : <AllProducts loading={loading} singleProductsEmit={(pro) => setSingleProduct(pro)} propsductsCollection={renderProducts} expand={menuContex.menuState} />
                }
            </div>
        )
    }

    return (
        <>
            <PageBase SingleElement={<SingleElement />} />
        </>
    )
}

export default CategoryProducts