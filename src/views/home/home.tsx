import { memo, useCallback, useEffect, useMemo, useState } from "react";
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

const getModel = async (connected: boolean) => {
  const collectionModel = await Collection.firstModelInit(connected)
  return collectionModel.getValidCollections()
}

const Home = () => {
  const defaultIndex = 0
  const [connected, setConnected] = useState(false);
  const [img, setImg] = useState(cld.image(''));
  const [activeCollection, setActiveCollection] = useState<ICollectionNew | null>(null);
  const navigate = useNavigate()
  const { data } = useQuery('collection', async () => getModel(connected), { suspense: true });

  useEffect(() => {
    if (data && data.length) {
      setConnected(true)
      setActiveCollection(data[defaultIndex])
    }
  }, [data]);

  useEffect(() => {
    activeCollection && setImg(cld.image(activeCollection.imgId))
  }, [activeCollection]);

  const MySideOptions = useCallback(() => {
    return (
      <CustomSideOptions setActiveCollection={setActiveCollection} collection={data || []} />
    )
  }, [data, setActiveCollection])

  const MyImage = useCallback(() => {
    return (
      <AdvancedImage className="img-fullheight" cldImg={img} />
    )
  }, [img])

  const MyText = useCallback(() => {
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
        <h1 className="content_bottom_title">{activeCollection?.nome}</h1>
        <h3 className="content_bottom_description"> {activeCollection?.description}</h3>
        <Button clickEmitter={() => handleClick()} type="1" style={{ marginTop: "23px" }} label="SEE COLLECTION"></Button>
      </>
    )
  }, [activeCollection])

  return (
    <PageBase
      customClass="home-custom-class"
      sideOptionsMargin={true}
      title={activeCollection?.nome || ""}
      description={activeCollection?.description || ""}
      Text={MyText}
      Main={MyImage}
      CustomSideOptions={MySideOptions}
    />
  )
}

export default Home;