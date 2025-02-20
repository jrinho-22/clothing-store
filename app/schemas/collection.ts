import { Schema } from '../helpers/const'
import mongoose from "mongoose"
import { ICollectionDto } from '../interface/collectionDto';
import { collectionData } from '../database/data/collection';

const collectionSchema = new Schema<ICollectionDto>({
    nome: { type: String, required: true, unique: true },
    lancamento: { type: Date, default: null },
    imgId: { type: String, required: true },
    description: { type: String, required: true }
});

export const Collection = mongoose.model<ICollectionDto>('Collection', collectionSchema);

export const collectionSeed = async () => {
    for (let data of collectionData) {
        let collection: mongoose.Document | null
        collection = await Collection.findOne({ nome: data.nome })
        if (collection) continue
        collection = new Collection({
            ...data,
        });
        await collection.save();
    }
}