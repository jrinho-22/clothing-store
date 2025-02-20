import { ReactNode, useEffect } from 'react'
import './sideOptions.sass'
import { useTypesSeletor } from '../../../hooks/typedSelector'
import { useNavigate } from 'react-router-dom'

export type sideOptionsType = {
  children?: ReactNode
}



const SideOptions: React.FC<sideOptionsType> = ({ children }: sideOptionsType) => {
  const items = useTypesSeletor((state) => state.checkout.items.length);
  const navigate = useNavigate()
  return (
    <div className={`menu-options`}>
      {/* <div className="menu-options_top">
        <div onClick={() => navigate("/cart")} className="cart">
            <div className='cart_item'>
              <span className="mi-work"></span>
              <span className='cart_item_number'>{items}</span>
            </div>
            <span>Cart</span>
        </div>
        <div className="voting">
          <div>
            <span className="i-star"></span>
            <span>Voting</span>
          </div>
        </div>
      </div> */}
      <div className="menu-options_bottom">
        {children && children}
      </div>
    </div>
  )
}

export default SideOptions