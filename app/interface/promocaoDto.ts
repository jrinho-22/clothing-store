import mongoose from "mongoose";

export interface IPromocaoSchema {
    productId: mongoose.Schema.Types.ObjectId,
    desconto: Number,                        
    dataInicio: Date,
    dataFim: Date,
    pontosNecessarios: Number
}

export interface IPromocaoDto {
    productName: String,
    desconto: Number,                        
    dias: number,
    pontosNecessarios: Number
}