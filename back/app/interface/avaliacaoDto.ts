import mongoose from "mongoose";

export interface IAvaliacaoDto {
    nota: Number,
    descricao: String,
    productId: mongoose.Schema.Types.ObjectId | String,
    userId: mongoose.Schema.Types.ObjectId | String, 
    sellerResponse?: String
}
