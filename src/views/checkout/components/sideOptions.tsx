import { useEffect, useState } from "react";
import SideOptions from "../../../components/page/sideOptions/sideOptions"
import { useTypesSeletor } from "../../../hooks/typedSelector";
import "./sideOptions.sass"
import { getPartialCard } from "../../../helpers/general";
import { cardInformation, endereco } from "../checkout";
import Loading from "../../../components/loading/loading";
import { transition } from "@cloudinary/url-gen/actions/effect";

type props = {
    actionEmitter: () => any
}

type cartValues = {
    total: number
    //discount: number
    toPay: number
    // deliveryFee: number
}

const CustomSideOptions = ({ actionEmitter }: props) => {
    const cartInitial = { total: 0, toPay: 0 }
    const cartItems = useTypesSeletor((state) => state.checkout.items);
    const [cartValues, setCartValues] = useState<cartValues>({ ...cartInitial });
    const selectorOrder = useTypesSeletor(v => v.order)

    useEffect(() => {
        const cart = cartItems.reduce((accumulator, currentValue) => {
            //const toPay = currentValue.preco - 
            return { total: currentValue.preco + accumulator.total, toPay: currentValue.preco + accumulator.total }
        }, cartInitial);
        setCartValues(cart)
    }, [cartItems]);

    useEffect(() => {
        console.log(selectorOrder, 'selectorOrderselectorOrder');
    }, [selectorOrder.payment]);

    const getStyle = () => {
        return selectorOrder.loading ? {opacity: ".1", transition: "none"} : {}
    }

    return (
        <SideOptions>
            {selectorOrder.loading &&
                <span className="loading">
                    <Loading color="black"/>
                </span>
            }
            <div style={{ ...getStyle(), justifyContent: "space-evenly" }} className="custom-side-options-checkout">
                <div className="custom-side-options-checkout_checkout-item">
                    <span className="title">Payment Option</span>
                    <div className="item">
                        <span className="i-credit-card"></span>
                        <div className="payment">
                            <span className="type">Credit</span>
                            <span className="card-number">{getPartialCard(selectorOrder.payment?.number)}</span>
                        </div>
                    </div>
                </div>
                <div className="custom-side-options-checkout_checkout-item">
                    <span className="title">Delivery Option</span>
                    <div className="item">
                        <span className="mi-location-home"></span>
                        <div className="address">
                            <span className="street">{selectorOrder.delivery?.street}</span>
                            <span className="address-detail">{selectorOrder.delivery?.city}, {selectorOrder.delivery?.state}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={getStyle()} className="custom-side-options-checkout">
                <div className="custom-side-options-checkout_description">
                    <span className="label">Quantity</span>
                    <span className="value">{cartItems.length}</span>
                </div>
                <div className="custom-side-options-checkout_description">
                    <span className="label">Total</span>
                    <span className="value">{cartValues.total.toLocaleString()}$</span>
                </div>
                <div className="custom-side-options-checkout_description">
                    <span className="label">Discount</span>
                    <span className="value">0$</span>
                </div>
                <div className="custom-side-options-checkout_description">
                    <span className="label">Delivery Fee</span>
                    <span className="value">100$</span>
                </div>
                <div className="custom-side-options-checkout_description" style={{ margin: "15px 0" }}>
                    <span className="label">To Pay</span>
                    <span className="value">{(cartValues.toPay + 100).toLocaleString()}$</span>
                </div>
            </div>
            <div onClick={() => actionEmitter()} className="checkout">
                <div className="custom-side-options-checkout_description">
                    <span>Place Order</span>
                    <span className="mi-arrow-right-long"></span>
                </div>
            </div>
        </SideOptions>
    )

}

export default CustomSideOptions