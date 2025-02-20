import { useEffect, useMemo, useState } from "react"
import CheckBox from "../../../components/inputs/checkbox/checkbox"
import TextField from "../../../components/inputs/textField/textxField"
import SearchElement from "../../../components/searchBar/searchBar"
import useFilters, { filterRecord } from "../../../hooks/useFilters"
import Produto from "../../models/products"
import { sizes } from "../../../helpers/conts"
import { IProduto } from "../../../interfaces/IProduct"
import { ICategoria } from "../../../interfaces/ICategoria"
import Categoria from "../../models/categoria"
import Collection from "../../models/collection"
import { ICollection } from "../../../interfaces/ICollection"

type props = {
    paramsValue?: {field?: keyof IProduto, value?: any[] | null}
    collectionEmit: (coll: IProduto[]) => any
}

const SearchComp = ({ collectionEmit, paramsValue }: props) => {
    const productsModel = new Produto()
    const categoriasModel = new Categoria()
    const collectionsModel = new Collection()
    const [allCategorias, setAllCategorias] = useState<ICategoria[]>([]);
    const [allCollection, setAllCollection] = useState<ICollection[]>([]);
    const fieldValues: filterRecord<IProduto> = {
        size: { value: [], field: "size", rule: "equal" },
        name: { value: [], field: "name", rule: "contain" },
        categoria: { value: [], field: "categoria", rule: "equal" },
        collection: { value: [], field: "collection", rule: "equal" },
        sex: { value: [], field: "sex", rule: "equal" }
    }
    const { filteredCollection, updateValues, record, clearRecord, getFilteredCollection } = useFilters<IProduto>(productsModel, fieldValues)

    useEffect(() => {
        getAllCategorias()
        getAllCollection()
    }, []);

    const getAllCategorias = async () => {
        const categorias = await categoriasModel.getSubCategories()
        setAllCategorias(categorias)
    }

    const getAllCollection = async () => {
        const collection = await collectionsModel.get()
        setAllCollection(collection)
    }

    const search = async () => {
        await getFilteredCollection()
    }

    useEffect(() => {
        collectionEmit(filteredCollection || [])
    }, [filteredCollection]);

    useEffect(() => {
        paramsValue
        && paramsValue.field
        && paramsValue.value
        && updateValues(paramsValue.field, paramsValue.value)
    }, [paramsValue]);

    const sizesCollection = () => {
        return useMemo(() => sizes.map(size => { return { value: size, label: size } }), [sizes])
    }

    const collectionCollection = () => {
        return useMemo(() => allCollection.map(coll => { return { value: coll._id, label: coll.nome } }), [allCollection])
    }

    const catgoriasCollection = () => {
        return useMemo(() => allCategorias.map(cat => { return { value: cat._id, label: cat.nome } }), [allCategorias])
    }

    // const memoizedUser = useMemo(() => paramsValue, [paramsValue])
    // const User = useMemo(() => catgoriasCollection(), [allCategorias])

    return (
        <SearchElement record={record} clearEmitter={() => clearRecord()} searchEmitter={() => search()} notStatic={true}>
            <CheckBox value={record.categoria?.value} title="Categoria" emitter={(value) => updateValues("categoria", value)} collection={catgoriasCollection()} classes="width-4" />
            <CheckBox value={record.collection?.value} title="Collection" emitter={(value) => updateValues("collection", value)} collection={collectionCollection()} classes="width-4" />
            <CheckBox value={record.size?.value} title="Size" emitter={(value) => updateValues("size", value)} collection={sizesCollection()} classes="width-3" />
            {/* <TextField value={record.name?.value[0]} title="Name" emitter={(value) => updateValues("name", [value])} classes="width-3" />    */}
        </SearchElement>
    )
}

export default SearchComp