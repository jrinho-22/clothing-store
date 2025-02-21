import { useContext, useEffect, useRef, useState } from "react";
import PageBase from "../../components/page/page-base/pageBase";
import pageDescriptions from "../../helpers/pageDescriptions";
import { ICategoria } from "../../interfaces/ICategoria";
import Categoria from "../models/categoria";
import './products.sass'
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../helpers/cloundinary.config";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../components/page/skeleton/skeleton";
const Products = () => {

    const categoriaModel = new Categoria()
    const [categoria, setCategoria] = useState<ICategoria[]>([]);
    const [forwardCategoria, setForwardCategoria] = useState<{ state: string | string[], label: string }>();
    const menuContex = useContext(MenuContext);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

    useEffect(() => {
        getCategoria()
    }, []);

    useEffect(() => {
        getCategoria()
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, [menuContex.menuState]);


    const getCategoria = async () => {
        const categoria = await categoriaModel.getParentCategories()
        setCategoria(categoria)
    }

    const getByParent = async (parentId: string, parentLabel: string) => {
        if (parentLabel == "Women") {
            setForwardCategoria({ state: "Women", label: parentLabel })
        } else {
            categoriaModel.getSubByParent(parentId).then(res => {
                setForwardCategoria({ state: res.map(r => r._id), label: parentLabel })
            })
        }
    }

    useEffect(() => {
        if (forwardCategoria) {
            if (forwardCategoria.state == "Women") {
                navigate(`/all-products`, {
                    state: {
                        filter: { sex: { value: ["W"], field: "sex", rule: "equal" } },
                        label: forwardCategoria.label,
                        field: "sex"
                    }
                })
            } else {
                navigate(`/all-products`, {
                    state: {
                        filter: { categoria: { value: forwardCategoria.state, field: "categoria", rule: "equal" } },
                        label: forwardCategoria.label,
                        field: "categoria"
                    }
                })
            }
        }
    }, [forwardCategoria]);

    return (
        <>
            <PageBase
                title={pageDescriptions.allPages.title}
                description={pageDescriptions.allPages.subtitle}>
            </PageBase>
            <div ref={containerRef} className={`main-wrapper ${!menuContex.menuState ? "shrink" : ""}`}>
                {categoria.map((cat: ICategoria) => {
                    return (
                        <div onClick={() => getByParent(cat._id, cat.nome)} className="categorias">
                            <div className="imgg">
                                <AdvancedImage cldImg={cld.image(cat.imgId)} />
                            </div>
                            <span className="i-seta-dir">{cat.nome.toLocaleUpperCase()}</span>
                        </div>
                    )
                }
                )}
            </div>
        </>
    )
}


export default Products