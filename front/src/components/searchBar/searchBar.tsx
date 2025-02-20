import { useContext, useEffect, useState } from "react"
import Button from "../button/button"
import "./searchBar.sass"
import { SearchBuilders } from "../../helpers/filters"
import { filterRecord } from "../../hooks/useFilters"
import { MenuContext } from "../page/skeleton/skeleton"

type props = {
    notStatic: boolean
    children?: React.ReactNode
    searchEmitter: () => any
    clearEmitter: () => any
    record: filterRecord<any>
}

const SearchElement = ({notStatic = false, children, searchEmitter, clearEmitter, record}: props) => {
    const menuContex = useContext(MenuContext)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setDisabled(SearchBuilders.checkEmptyFIlter(record))
      }, [record]);

    return (
        <div className={`search ${notStatic ? "not-static" : ""} ${!menuContex.menuState ? "expand" : ""}`}>
            <div onClick={() => menuContex.setMenuState(!menuContex.menuState)} className="search_button">
                <span className="i-chevron-esq"></span>
            </div>
            <div className="search_item">
                <div className="search_item_row_wrapper">
                    <div className="search_item_row_wrapper_item">
                        {children}
                    </div>
                </div>
                <div className="search_item_action_wrapper">
                    <div className="search_item_action_wrapper_item">
                        <div className="line"></div>
                        <div className="actions">
                            <Button clickEmitter={() => clearEmitter()} type="3" label="Clear"></Button>
                            <Button disabled={disabled} clickEmitter={() => searchEmitter()} type="2" label="Search"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchElement