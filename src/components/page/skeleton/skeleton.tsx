import { createContext, useState } from "react";
import SideMenu from "../sideMenu/sideMenu"
import TopMenu from "../topMenu/topMenu"
import { Outlet } from "react-router-dom";

export const MenuContext = createContext({menuState: true, setMenuState: (_v: boolean) => {}});

const Skeleton = () => {
    const [showMenu, setShowMenu] = useState<boolean>(true);
    
    return(<>
      <MenuContext.Provider value={{menuState: showMenu, setMenuState: setShowMenu}}>
        <div className="Background">
          <TopMenu />
          <SideMenu showMenu={showMenu} setShowMenu={setShowMenu}></SideMenu>
          <Outlet />
        </div>
      </MenuContext.Provider>
    </>)
}

export default Skeleton