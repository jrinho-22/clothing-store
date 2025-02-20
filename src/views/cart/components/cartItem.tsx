import { AdvancedImage } from "@cloudinary/react"
import { cld } from "../../../helpers/cloundinary.config"
import { IProdutoCart } from "../../../interfaces/IProduct"
import "./cartItem.sass"
import { useDispatch } from "react-redux"
import { actions } from "../../../store/reducers"
type props = {
    product: IProdutoCart & { quantity: number }
}

const CartItem = ({ product }: props) => {
    const myImage = cld.image(product.img);
    const dispatch = useDispatch()

    const removeItem = () => {
        dispatch(actions.checkout.removeItem(product))
        alert("Product removed successfully")
    }

    return (
        <div className="cart-item">
            <div className="cart-item_img">
                <AdvancedImage className="img-fullheight" cldImg={myImage} />
            </div>
            <div className="cart-item_name">
                <span className="title">{product.categoria}</span>
                <span>{product.name}</span>
            </div>
            <div className="cart-item_size">
                <span className="title">Size</span>
                <span>{product.size}</span>
            </div>
            <div className="cart-item_color">
                <span className="title">Sex</span>
                <span>{product.sex}</span>
            </div>
            <div className="cart-item_price">
                <span className="title">Price</span>
                <span>{product.preco}</span>
            </div>
            <div className="cart-item_quant">
                <span className="title">Quantity</span>
                <span>{product.quantity}</span>
            </div>
            <div className="cart-item_close">
                <span onClick={() => removeItem()} className="i-fechar"></span>
            </div>
        </div>
    )
}

export default CartItem