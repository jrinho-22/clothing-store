import { useEffect, useState } from "react";
import PageBase from "../../components/page/page-base/pageBase"
import { useTypesSeletor } from "../../hooks/typedSelector";
import "./cart.sass"
import { IProdutoCart } from "../../interfaces/IProduct";
import CartItem from "./components/cartItem";
import CustomSideOptions from "./components/sideOptions";

const SingleElement = () => {
    const [products, setProducts] = useState<(IProdutoCart & { quantity: number })[]>([])
    const cartItems = useTypesSeletor((state) => state.checkout.items);

    useEffect(() => {
        const filtered = cartItems.reduce((acc: (IProdutoCart & { quantity: number })[], current) => {
            const found = acc.find(item => item._id === current._id && item.size == current.size);
            if (found) {
                found.quantity += 1;
            } else {
                acc.push({ ...current, quantity: 1 });
            }
            return acc;
        }, []);
        setProducts(filtered)
    }, [cartItems])


    return (
        <div className="cart-wrapper">
            <h3 className="cart-wrapper_title">Cart</h3>
            <div className="cart-wrapper_cart">
                {products.map(product => <CartItem product={product} />)}
            </div>
        </div>
    )
}

const Cart = () => {

    return (
        <PageBase CustomSideOptions={CustomSideOptions} SingleElement={<SingleElement />} />
    )
}

export default Cart