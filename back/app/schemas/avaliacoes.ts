import { Schema } from '../helpers/const'
import mongoose from "mongoose"
import { IAvaliacaoDto } from '../interface/avaliacaoDto';
import { avaliacoesData } from '../database/data/avaliacoes';
import { User } from './users';
import { Produto } from './produto';

const avaliacoesSchema = new Schema<IAvaliacaoDto>({
    descricao: { type: String, required: true },
    nota: { type: Number, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerResponse: { type: String, default: null }
});

export const Avaliacoes = mongoose.model<IAvaliacaoDto>('Avaliacao', avaliacoesSchema);

// fase 2
export const createResponse = async (produtoName: String, userName: String, comment: String) => {
    const user = await User.findOne({ name: userName })
    const produto = await Produto.findOne({ name: produtoName })
    const Avaliacao = await Avaliacoes.findOne({ userId: user?._id, productId: produto?._id })
    if (!Avaliacao) throw new Error("Avaliacao não encontrada")
    Avaliacao.sellerResponse = comment
    Avaliacao.save()
    console.log("Comentario adicionado com sucesso")
}
// 

export const saveAvaliacao = async (avaliacaoDto: IAvaliacaoDto) => {
    const avalacao = new Avaliacoes(avaliacaoDto);
    await avalacao.save();
    console.log("User saved:", avalacao);
};

export const avaliacoesSeed = async () => {
    for (let data of avaliacoesData) {
        let avaliacao: mongoose.Document | null
        avaliacao = await Avaliacoes.findOne({ descricao: data.descricao })
        if (avaliacao) continue
        const user = await User.findOne({ name: data.userId })
        const produto = await Produto.findOne({ name: data.productId })
        avaliacao = new Avaliacoes({
            ...data,
            productId: produto?._id,
            userId: user?._id,
        });
        await avaliacao.save();
    }
}

export const findAvaliacaoPorProduto = async (produto: String) => {
    try {
        const produtosObj = await Produto.find({ name: produto });
        if (!produtosObj) {
            throw new Error('Produto não encontrado');
        }
        const avaliacao = await Avaliacoes.find({ productId: produtosObj.map(v => v._id) });
        if (avaliacao) {
            console.log(`Avaliação encontrada para o produto ${produto}: `, avaliacao.map((v: any) => v.descricao));
            return avaliacao;
        }
    } catch (error) {
        Promise.reject(error)
    }
}

export const getAverageRatingForProducts = async (produtoName: string) => {
    try {
        const result = await Avaliacoes.aggregate([
            {
                $group: {
                    _id: "$productId", 
                    averageRating: { $avg: "$nota" }, 
                    totalReviews: { $sum: 1 } 
                }
            },
            {
                $sort: { averageRating: -1 } 
            }
        ]);

        console.log("Average Ratings per Product:", result);

    } catch (error) {
        console.error('Error in calculating average ratings:', error);
        throw error;
    }
};
