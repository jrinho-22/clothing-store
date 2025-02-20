import { AdvancedImage } from "@cloudinary/react"
import { IProduto, IProdutoCart, sizeType } from "../../../../interfaces/IProduct"
import "./single-wrapper.sass"
import { cld } from "../../../../helpers/cloundinary.config"
import { sizes } from "../../../../helpers/conts"
import { useState } from "react"
import Button from "../../../../components/button/button"
import { useDispatch } from "react-redux"
import { actions } from "../../../../store/reducers"

type props = {
    product: IProduto
    closeEmit: () => any
}
const SingleProducts = ({ product, closeEmit }: props) => {
    const dispatch = useDispatch();
    const [size, setSize] = useState<sizeType>()
    const [actionFailed, setActionFailed] = useState<boolean>(false)

    const filterProduct = (product: IProduto): IProdutoCart | undefined => {
        if (size) {
            const newP: IProdutoCart = {
                _id: product._id,
                categoria: product.categoria,
                name: product.name,
                preco: product.preco,
                sex: product.sex,
                size: size,
                img: product.img
            }
            return newP
        }
    }

    const addBag = (product: IProduto) => {
        if (!size) {
            setActionFailed(true)
            return
        }
        const filteredProduct = filterProduct(product)
        filteredProduct && dispatch(actions.checkout.addItem(filteredProduct))
        alert("Product added to bag successfully")
    }

    const sizesClasses = (currentsize: sizeType) => {
        let classes = []
        actionFailed && !size && classes.push("error")
        currentsize == size && classes.push("active")
        !product?.size.includes(currentsize) && classes.push("not-available")
        return classes.join(" ")
    }

    return (
        <div className="single-wrapper">
            <div className="single-wrapper-image">
                <div className="absolute-wrapper">
                    <AdvancedImage className="img-fullheight" cldImg={cld.image(product?.imgDisplay)} />
                </div>
                <AdvancedImage className="img-full" cldImg={cld.image("studio-background_ryp1gv")} />
            </div>
            <div className="description">
                <span onClick={() => closeEmit()} className="go-back i-close"></span>
                <span className="description_top">{product?.name}</span>
                <span className="description_mid">{product?.descricao} </span>
                {/* <div className="description_bottom">
                    {sizes.map((size) =>
                        <span className={`${product?.size.includes(size) ? "size-available" : ""}`}>{size}</span>
                    )}
                </div> */}
                <div className="description_sizes">
                    {sizes.map((size) =>
                        <span onClick={() => setSize(size)} className={`description_sizes_item ${sizesClasses(size)}`}>{size}</span>
                    )}
                </div>
                <span className="description_price">R$ {product?.preco}</span>
                <div className="description_action">
                    <Button classes="custom-button" label="Add to bag" type="2" clickEmitter={() => { addBag(product) }}></Button>
                    {/* <Button classes="custom-button" label="Favorite" type="3" clickEmitter={() => { }}></Button> */}
                </div>
            </div>
        </div>
    )
}

export default SingleProducts