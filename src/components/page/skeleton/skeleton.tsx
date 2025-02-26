import { createContext, Suspense, useState } from "react";
import SideMenu from "../sideMenu/sideMenu"
import TopMenu from "../topMenu/topMenu"
import { Outlet } from "react-router-dom";
import Loading from "../../loading/loading";

export const MenuContext = createContext({ menuState: true, setMenuState: (_v: boolean) => { } });

const Skeleton = () => {
  const [showMenu, setShowMenu] = useState<boolean>(true);

  return (<>
    <MenuContext.Provider value={{ menuState: showMenu, setMenuState: setShowMenu }}>
      <div className="Background">
        <Suspense fallback={<Loading full={true} color="black"/>}>
          <TopMenu />
          <SideMenu showMenu={showMenu} setShowMenu={setShowMenu}></SideMenu>
          <Outlet />
        </Suspense>
      </div>
    </MenuContext.Provider >
  </>)
}

export default Skeleton