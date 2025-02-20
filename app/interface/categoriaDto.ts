import mongoose from "mongoose";

export interface ICategoriaDto {
    nome: string,
    imgId?: string,
    parentCategory?: ICategoriaDto["nome"]
}