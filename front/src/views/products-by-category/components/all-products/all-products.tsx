import { AdvancedImage } from "@cloudinary/react"
import { IProduto } from "../../../../interfaces/IProduct"
import { cld } from "../../../../helpers/cloundinary.config"
import { sizes } from "../../../../helpers/conts"
import "./all-products.sass"
import { useEffect } from "react"

type props = {
    propsductsCollection: IProduto[]
    expand: boolean
    loading: boolean
    singleProductsEmit?: (produto: IProduto) => any
}

const AllProducts = ({ loading, propsductsCollection, expand, singleProductsEmit = () => { } }: props) => {
    const itemsToLoad = ["", "", ""]
    useEffect(() => {
        console.log('loadinggg', loading);
    }, [loading]);
    return (
        <div className={`content-all-products ${!propsductsCollection.length && !loading ? "no-item" : ""} ${!expand ? "expand" : ""}`}>
            {loading ? itemsToLoad.map(v => <div className="wave"></div>) :
                propsductsCollection.length ? propsductsCollection.map(p =>
                    <div onClick={() => singleProductsEmit(p)} className={`content-all-products_item`}>
                        <div className="basic-wrapper">
                            <div className="background-wrapper">
                                <AdvancedImage className="img-full" cldImg={cld.image("studio-background_ryp1gv")} />
                            </div>
                            <div className="description">
                                <span className="description_top">{p.name}</span>
                                <span className="description_mid">{p.descricao} </span>
                                <div className="description_bottom">
                                    {sizes.map((size) =>
                                        <span className={`${p.size.includes(size) ? "size-available" : ""}`}>{size}</span>
                                    )}
                                </div>
                                <span className="description_price">R${String(p.preco)}</span>
                            </div>
                            <div className="absolute-wrapper">
                                <AdvancedImage className="img-fullheight" cldImg={cld.image(p.imgDisplay)} />
                            </div>
                        </div>
                    </div>
                ) : <div className="no-items">No item found,<br /> apply search to find new items</div>
            }
        </div>
    )
}

export default AllProducts