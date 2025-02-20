import mongoose from "mongoose";

export interface ITransactionDto {
    productId: mongoose.Schema.Types.ObjectId | String,
    userId: mongoose.Schema.Types.ObjectId | String, 
}