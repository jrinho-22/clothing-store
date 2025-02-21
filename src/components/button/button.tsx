import './button.sass'

type props = {
    label: string
    style?: any
    disabled?: boolean
    classes?: string
    type: "1" | "2" | "3"
    clickEmitter?: (e: React.MouseEvent<HTMLButtonElement>) => any
    buttonType?: "submit" | "reset" | "button" | undefined
}

const Button = ({ buttonType, disabled = false, label, style, classes = "", type, clickEmitter }: props) => {
    const typeClass = () => {
        return "type-" + type
    }

    return (
        <button type={buttonType} onClick={(e: React.MouseEvent<HTMLButtonElement>) => clickEmitter && clickEmitter(e)} className={`${classes} ${typeClass()} ${disabled ? "disabled" : ""}`} style={{ ...style }}>{label}</button>
    )
}

export default Button