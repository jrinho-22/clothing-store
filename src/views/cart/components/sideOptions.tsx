import { useEffect, useState } from "react";
import SideOptions from "../../../components/page/sideOptions/sideOptions"
import { useTypesSeletor } from "../../../hooks/typedSelector";
import "./sideOptions.sass"
import { useNavigate } from "react-router-dom";

type props = {
}

type cartValues = {
    total: number
    //discount: number
    toPay: number
    // deliveryFee: number
}

const CustomSideOptions = ({ }: props) => {
    const cartInitial = { total: 0, toPay: 0 }
    const cartItems = useTypesSeletor((state) => state.checkout.items);
    const [cartValues, setCartValues] = useState<cartValues>({ ...cartInitial });
    const navigate = useNavigate()
    const user = useTypesSeletor((state) => state.user.user);

    useEffect(() => {
        const cart = cartItems.reduce((accumulator, currentValue) => {
            //const toPay = currentValue.preco - 
            return { total: currentValue.preco + accumulator.total, toPay: currentValue.preco + accumulator.total }
        }, cartInitial);
        setCartValues(cart)
    }, [cartItems]);

    const clickHandler = () => {
        if (!user) {
            alert("User not Signed in")
        } else {
            navigate("/cart/checkout")
        }
    }

    return (
        <SideOptions>
            <div className="custom-side-options-cart">
                <div className="custom-side-options-cart_description">
                    <span className="label">Quantity</span>
                    <span className="value">{cartItems.length}</span>
                </div>
                <div className="custom-side-options-cart_description">
                    <span className="label">Total</span>
                    <span className="value">{cartValues.total.toLocaleString()}$</span>
                </div>
                <div className="custom-side-options-cart_description">
                    <span className="label">Discount</span>
                    <span className="value">0$</span>
                </div>
                <div className="custom-side-options-cart_description">
                    <span className="label">Delivery Fee</span>
                    <span className="value">100$</span>
                </div>
                <div className="custom-side-options-cart_description" style={{ margin: "15px 0" }}>
                    <span className="label">To Pay</span>
                    <span className="value">{(cartValues.toPay + 100).toLocaleString()}$</span>
                </div>
            </div>
            <div onClick={() => clickHandler()} className="checkout">
                <div className="custom-side-options-cart_description">
                <span>CHECKOUT</span>
                <span className="mi-arrow-right-long"></span>
                </div>
            </div>
        </SideOptions>
    )

}

export default CustomSideOptions