import './formRadio.sass'
type props = {
    title: string
    subTitle?: string
    iconsClass?: string
    checked: boolean
    clickEmitter: () => any
    style?: Object
};

const CheckoutRadio = ({ style, clickEmitter, checked = true, title, subTitle, iconsClass }: props) => {
    return (
        <div style={style} onClick={clickEmitter} className={`form-radio-wrapper ${checked ? "checked" : ""}`}>
            {iconsClass && <span className={iconsClass}></span>}
            <div className='form-radio-wrapper_description'>
                <span className='form-radio-wrapper_description_title'>{title}</span>
                {subTitle && <span className='form-radio-wrapper_description_subtitle'>{subTitle}</span>}
            </div>
        </div>
    );
};

export default CheckoutRadio;