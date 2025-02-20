import { IGeo } from "./IGeo"

export type sex = "M" | "W" | "MW"
export type sizeType = "XS" | "S" | "M" | "L" | "XL"
export type IProdutosSizes = Array<sizeType>

export interface IProduto {
    _id: string
    name: String,        
    descricao: String,       
    preco: number,        
    quantidadeDisponivel: number,
    categoria: string
    locVendedor?: IGeo,
    sex: sex,
    size: IProdutosSizes
    collection?: string,
    img: string
    imgDisplay: string | null
}

export interface IProdutoCart {
    _id: string
    categoria: string,
    name: String,        
    preco: number,        
    sex: sex,
    size: sizeType
    img: string
}

export type IProdutoUpdate = {
    [key in keyof IProduto]?: IProduto[key];
}