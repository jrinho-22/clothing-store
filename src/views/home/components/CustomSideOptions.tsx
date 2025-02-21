import { AdvancedImage } from '@cloudinary/react';
import { ICollectionNew } from '../../../interfaces/ICollection';
import { cld } from '../../../helpers/cloundinary.config';
import "./CustomSideOptions.sass"
import SideOptions from '../../../components/page/sideOptions/sideOptions';
type props = {
    collection: ICollectionNew[],
    setActiveCollection: (arg: ICollectionNew) => void
}

const CustomSideOptions = ({ collection, setActiveCollection }: props) => {
    return (
        <SideOptions>
            {
                collection.map((coll: ICollectionNew, index: number) => {
                    const myImage = cld.image(coll.imgId);
                    const backColor = index % 2 == 0 ? "rgb(14 14 14 / 100%)" : "rgb(0 0 0 / 100%)";
                    return (
                        <div>
                            <div className='back'>
                                <div className='img-wrapper'>
                                    <AdvancedImage className='img-fullheight' cldImg={myImage} />
                                </div>
                            </div>
                            <div style={{ backgroundColor: backColor }} className="menu-options_bottom_item" onClick={() => { setActiveCollection(coll) }}>

                                <span className='new-collection'>
                                    {coll.new ? "New collection" : ""}
                                </span>
                                <span>
                                    {coll.nome}
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </SideOptions>
    )


}

export default CustomSideOptions