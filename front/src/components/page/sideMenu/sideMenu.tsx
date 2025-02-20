import nav from "./menuItems"
import { INaveItem } from "../../../interfaces/INavItems"
import "./SideMenu.sass";
import { useNavigate } from "react-router-dom";
import { useTypesSeletor } from "../../../hooks/typedSelector";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/reducers";

type props = {
    showMenu: Boolean
    setShowMenu: (arg: boolean) => void
}

const SideMenu = ({ showMenu, setShowMenu }: props) => {
    const navItems = nav
    const navigate = useNavigate()
    const user = useTypesSeletor(store => store.user.user)
    const dispatch = useDispatch()

    const getLabel = (label: string) => {
        if (label == "checkUser") {
            if (!user) {
                return "Sign In"
            } else {
                return "Sign Out"
            }
        }
        return label
    }

    const handleClick = (path: string) => {
        if (path == "signUser") {
            if (!user) {
                navigate("/signin")
            } else {
                dispatch(actions.user.removeUser(""))
                alert(user.name + " signed out successfully")
                navigate("/home")  
            }
        } else {
            navigate("/" + path)
        }
    }

    return (
        <div className="side-elements">
            <div className={`side-toggle-menu`}>
                <span
                    className={`i-fechar ${!showMenu ? "soft-hide" : ''}`}
                    onClick={() => setShowMenu(false)}>
                </span>
                <span
                    className={`i-menu ${showMenu ? "soft-hide" : ''}`}
                    onClick={() => setShowMenu(true)}
                >
                </span>
            </div>
            <div className={`side-menu ${showMenu ? "expand" : "shrink"}`}>
                {navItems.map((item: INaveItem, index) =>
                    <span onClick={() => handleClick(item.path)} key={index}>{getLabel(item.label)}</span>
                )}
            </div>
        </div>
    )
}

export default SideMenu