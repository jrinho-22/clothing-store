import mongoose from "mongoose";

export interface ICollectionDto {
    nome: string,
    lancamento: Date,
    imgId: string,
    description: string
}