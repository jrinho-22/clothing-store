import mongoose from "mongoose";
import { IGeo } from "./IGeoDto";

export interface IProdutoDto {
    name: String,        
    descricao: String,       
    preco: Number,        
    quantidadeDisponivel: Number,
    categoria: mongoose.Schema.Types.ObjectId | String
    locVendedor?: IGeo,
    sex: ("M" | "W" | "MW")[],
    size: Array<"XS" | "S" | "M" | "L" | "XL">,
    collection?:  mongoose.Schema.Types.ObjectId | String
    img: string
    imgDisplay: string | null
}

export type IProdutoUpdateDto = {
    [key in keyof IProdutoDto]?: IProdutoDto[key];
}