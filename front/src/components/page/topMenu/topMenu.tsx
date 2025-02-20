import { useNavigate } from "react-router-dom"
import { topeMenuItems } from "../../../helpers/conts"
import "./topMenu.sass"
import { useTypesSeletor } from "../../../hooks/typedSelector"
import { useDispatch } from "react-redux"
import { actions } from "../../../store/reducers"
import { ReactNode, useEffect, useState } from "react"

type props = {
    length: number
    children: ReactNode
}
const Rollable = ({ length, children }: props) => {
    const spanWidth = 450
    const [limit, setLimit] = useState(0)
    const [contentTranslate, setContentTranslate] = useState(0)
    const [direction, setDirection] = useState<"forward" | "backward">("forward")

    useEffect(() => {
        setLimit((length - 2) * -spanWidth)
    }, [length]);

    useEffect(() => {
        if (contentTranslate == 0) {
            setDirection("forward")
        }
        if (contentTranslate == limit) {
            setDirection("backward")
        }
    }, [contentTranslate, limit]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setContentTranslate(prev => {
                return direction == "forward" ?
                    prev - spanWidth :
                    prev + spanWidth
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [limit, contentTranslate, direction]);

    return (
        <div className="rollable-wrapper">
            <div style={{ translate: `${contentTranslate}px` }} className="rollable-content">
                {children}
            </div>
        </div>
    )
}


const TopMenu = () => {
    const navigate = useNavigate()
    const storeItems = useTypesSeletor(state => state.checkout.items)
    const user = useTypesSeletor(state => state.user.user)
    const dispatch = useDispatch()

    const getLabel = () => {
        if (user) return "Sign Out"
        return "Sign In"
    }

    const getAction = () => {
        if (!user) {
            navigate("/signin")
        } else {
            dispatch(actions.user.removeUser(""))
            alert(user.name + " signed out successfully")
            navigate("/home")
        }
    }
    return (
        <div className="top-menu">
            <div className="top-menu_left">
                <Rollable length={7}>
                    <span className="rollable-wrapper_item icon-puma"></span>
                    <span className="rollable-wrapper_item icon-under-armour"></span>
                    <span className="rollable-wrapper_item icon-air-jordan"></span>
                    <span className="rollable-wrapper_item icon-adidas"></span>
                    <span className="rollable-wrapper_item icon-nike"></span>
                    <span className="rollable-wrapper_item icon-puma"></span>
                    <span className="rollable-wrapper_item icon-under-armour"></span>
                </Rollable>
            </div>

            <div className="top-menu_right">

                <div onClick={() => navigate("/cart")} className="cart">
                    <div className='cart_item'>
                        <span className="mi-work"></span>
                        <span className='cart_item_number'>{storeItems.length}</span>
                    </div>
                </div>
                {topeMenuItems.map(item => <span>{item}</span>)}
                <span onClick={() => getAction()}>{getLabel()}</span>
            </div>
        </div>
    )
}

export default TopMenu