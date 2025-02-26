import { useEffect, useState } from "react";
import Collection from "../models/collection"
import { ICollectionNew } from "../../interfaces/ICollection";
import './home.sass'
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../helpers/cloundinary.config";
import Button from "../../components/button/button";
import PageBase from "../../components/page/page-base/pageBase";
import CustomSideOptions from "./components/CustomSideOptions";
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';

const Home = () => {
  const collectionModel = new Collection()
  const defaultIndex = 0
  // const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(cld.image(''));
  // const [loading, setLoading] = useState(false);
  // const [collection, setCollection] = useState<ICollectionNew[]>([]);
  const [activeCollection, setActiveCollection] = useState<ICollectionNew | null>(null);
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useQuery('collection', () => collectionModel.getValidCollections(), { suspense: true });

  useEffect(() => {
    if (data && data.length) {
      setActiveCollection(data[defaultIndex])
    }
  }, [data]);

  useEffect(() => {
    activeCollection && setImg(cld.image(activeCollection.imgId))
  }, [activeCollection]);

  const MySideOptions = () => {
    return (
      <CustomSideOptions setActiveCollection={setActiveCollection} collection={data || []} />
    )
  }

  const MyImage = (): JSX.Element => {
    let customStyle: Object = {}
    return (
      <AdvancedImage style={customStyle} className="img-fullheight" cldImg={img} />
    )
  }

  const MyText = (): JSX.Element => {
    const handleClick = () => {
      navigate(`/all-products`, {
        state: {
          filter: { collection: { value: [activeCollection?._id], field: "collection", rule: "equal" } },
          label: activeCollection?.nome,
          field: "collection"
        }
      })
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

  // if (isLoading) {
  //   throw new Promise((resolve) => resolve);
  // }

  return (
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
  )
}


export default Home