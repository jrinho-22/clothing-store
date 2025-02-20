import { useContext } from "react"
import "./pageBase.sass"
import { MenuContext } from "../skeleton/skeleton"

type props = {
    children?: React.ReactNode
    title?: string
    description?: string
    Main?: React.ComponentType
    CustomSideOptions?: JSX.Element
    sideOptionsMargin?: boolean
    SingleElement?: JSX.Element
    size?: 'large' | 'medium' | 'small'
    customClass?: string
}
const convertSize = (size: 'large' | 'medium' | 'small') => {
    if (size == 'large') return "position_large"
    if (size == 'medium') return "position_medium"
    if (size == 'small') return "position_small"
}
const PageBase: React.FC<props> = (
    {
        size = 'large',
        customClass,
        title = "",
        description = "",
        Main,
        CustomSideOptions,
        SingleElement,
        children,
        sideOptionsMargin = false
    }: props) => {
    console.log('Page base Component re-rendered');
    const menuContex = useContext(MenuContext);

    const DefaultText = () => {
        return (
            <>
                <h1 className="content_bottom_title">{title}</h1>
                <h3 className="content_bottom_description"> {description}</h3>
            </>
        )
    }

    return (
        <>
            <div className={
                `page-wrapper
                ${sideOptionsMargin ? "side-margin" : ""}
                ${!menuContex.menuState ? "shrink" : ""}
                ${customClass ? customClass : ""}`
            }>
                {SingleElement ? SingleElement :
                    <div className="grid">
                        {Main && <div className={`${convertSize(size)}`}>
                            <div className="img-wrapper">
                                <Main />
                            </div>
                        </div>}
                        <div className="text">
                            <div className="content">
                                <span className="content_top"></span>
                                <div className="content_bottom">
                                    {children || <DefaultText />}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {CustomSideOptions && CustomSideOptions}
        </>
    )
}

export default PageBase