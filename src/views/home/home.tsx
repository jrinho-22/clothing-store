import { useEffect, useState } from "react";
import Collection from "../models/collection"
import { ICollection, ICollectionNew } from "../../interfaces/ICollection";
import './home.sass'
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../helpers/cloundinary.config";
import Button from "../../components/button/button";
import SideOptions from "../../components/page/sideOptions/sideOptions";
import PageBase from "../../components/page/page-base/pageBase";
import CustomSideOptions from "./components/CustomSideOptions";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const collectionModel = new Collection()
  const defaultIndex = 0
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(cld.image(''));
  const [collection, setCollection] = useState<ICollectionNew[]>([]);
  const [activeCollection, setActiveCollection] = useState<ICollectionNew | null>(null);
  const navigate = useNavigate()


  useEffect(() => {
    getColection()
  }, []);

  useEffect(() => {
    if (collection.length) {
      setActiveCollection(collection[defaultIndex])
      setLoading(false)
    }
  }, [collection]);

  useEffect(() => {
    activeCollection && setImg(cld.image(activeCollection.imgId))
  }, [activeCollection]);

  const getColection = async () => {
    const collection = await collectionModel.getValidCollections()
    console.log(collection, 'collll')
    setCollection(collection)
  }

  const MySideOptions = () => {
    return (
      <CustomSideOptions setActiveCollection={setActiveCollection} collection={collection} />
    )
  }

  const MyImage = (): JSX.Element => {
    let customStyle: Object = {}
    // if (activeCollection?.imgId == "samples/woman-on-a-football-field") {
      // customStyle = { translate: "80px 0" }
    // }
    return (
      <AdvancedImage style={customStyle} className="img-fullheight" cldImg={img} />
    )
  }

  const MyText = (): JSX.Element => {
    const handleClick = () => {
      navigate(`/all-products`, { state: {
        filter: { collection: { value: [activeCollection?._id], field: "collection", rule: "equal" } },
        label: activeCollection?.nome,
        field: "collection"
      } })
    }
    return (
      <>
        {/* {activeCollection?.new &&
          <span className="content_bottom_new">
            New
          </span>
        } */}
        <>
          <h1 className="content_bottom_title">{activeCollection?.nome}</h1>
          <h3 className="content_bottom_description"> {activeCollection?.description}</h3>
        </>
        <Button clickEmitter={() => handleClick()} type="1" style={{ marginTop: "23px" }} label="SEE COLLECTION"></Button>
      </>
    )
  }

  return (
    <>
      <PageBase
        customClass="home-custom-class"
        sideOptionsMargin={true}
        title={activeCollection?.nome || ""}
        description={activeCollection?.description || ""}
        Main={MyImage}
        CustomSideOptions={<MySideOptions />}
      >
        <MyText />
      </PageBase>
    </>
    // <>
    //   {!loading && activeCollection ? (
    //     <div className={`page-wrapper ${!menuContex ? "shrink" : ""}`}>
    //       <div className="img-wrapper-outer">
    //         <div className="img-wrapper">
    //           <AdvancedImage cldImg={img} />
    //         </div>
    //       </div>
    //       <div className="content">
    //         <span className="content_top">Clothes designer</span>
    //         <div className="content_bottom">
    //           {activeCollection.new &&
    //             <span className="content_bottom_new">
    //               New
    //             </span>
    //           }
    //           <h1 className="content_bottom_title">{activeCollection.nome}</h1>
    //           <h3 className="content_bottom_description"> {activeCollection.description}</h3>
    //           <Button style={{marginTop: "23px"}} label="SEE COLLECTION"></Button>
    //         </div>
    //       </div>
    //     </div>
    //     // <div className="grid">
    //     //   <span className="item1">{activeCollection.nome}</span>
    //     //   <div className="item2">
    //     //     {activeCollection.imgId}
    //     //   </div>
    //     //   <div className="item3">
    //     //     <AdvancedImage cldImg={img} />
    //     //   </div>
    //     // </div>
    //   ) : (<div>
    //     loading
    //   </div>)
    //   }
    //   <SideOptions setActiveCollection={setActiveCollection} collection={collection}></SideOptions>
    // </>
  )
}


export default Home