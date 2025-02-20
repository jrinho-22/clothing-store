import { Schema } from '../helpers/const'
import mongoose from "mongoose"
import { User } from './users';
import { Produto, searchNearProducts } from './produto';
import { transactionData } from '../database/data/transactions';
import { ITransactionDto } from '../interface/transactionDto ';
import { Promocao } from './promocoes';

const transactionSchema = new Schema<ITransactionDto>({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Transaction = mongoose.model<ITransactionDto>('Transaction', transactionSchema);

// Parte 2 {
const checkDiscont = async (produtoId: mongoose.Types.ObjectId, userPontos: Number) => {
    let discontAmount = 0
    const discont = await Promocao.find({ productId: produtoId })
    for (let d of discont) {
        if (userPontos >= d.pontosNecessarios) {
            discontAmount += +d.desconto
        }
    }
    return discontAmount
}

const gerarPontos = (price: number) => {
    const pontosGerados = price / 100
    return pontosGerados > 1 ? pontosGerados : 1
}
// parte2 }

export const saveTransaction = async (transactionDto: ITransactionDto) => {
    let transaction: mongoose.Document | null
    const produto = await Produto.findOne({ name: transactionDto.productId })
    const user = await User.findOne({ name: transactionDto.userId })
    if (!user || !produto) {
        throw new Error('erro')
    }
    console.log(`quantidade disponivel ${transactionDto.productId}: ${produto?.quantidadeDisponivel}`)
    const discontAMount = await checkDiscont(produto._id, user.points || 0)
    console.log(`valor do desconto: ${discontAMount * +produto.preco}`)
    const pontos = gerarPontos(+produto.preco)
    user.points = pontos
    produto.quantidadeDisponivel = Number(produto.quantidadeDisponivel) - 1;
    transaction = new Transaction({
        productId: produto?._id,
        userId: user?._id,
    });
    await transaction.save();
    await user.save();
    // await produto.save();
    console.log("transaction saved");
    console.log(`quantidade disponivel ${transactionDto.productId}: ${produto?.quantidadeDisponivel}`)
};

export const transactionSeed = async () => {
    for (let data of transactionData) {
        let transaction: mongoose.Document | null
        const produto = await Produto.findOne({ name: data.productId })
        const user = await User.findOne({ name: data.userId })
        transaction = await Transaction.findOne({ userId: user?._id, productId: produto?._id })
        if (transaction) continue
        transaction = new Transaction({
            productId: produto?._id,
            userId: user?._id,
        });
        await transaction.save();
    }
}

export const allSalesByCategoty = async () => {
    const result = await Transaction.aggregate([
        {
            $lookup: {
                from: "produtos",
                localField: "productId",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $lookup: {
                from: "categorias",
                localField: "productDetails.categoria",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$productDetails", 
        },
        {
            $unwind: "$categoryDetails", 
        },
        // {
        //     $addFields: {
        //         validPreco: {
        //             $cond: {
        //                 if: { $isNumber: "$productDetails.preco" }, 
        //                 then: "$productDetails.preco",
        //                 else: 0
        //             }
        //         }
        //     }
        // },
        {
            $group: {
                _id: "$categoryDetails._id",  
                totalSales: { $sum: "$productDetails.preco" },  
                categoryName: { $first: "$categoryDetails.nome" }, 
                totalItems: { $sum: 1 }
            }
        },
        {
            $project: {
                totalSales: 1,
                categoryName: 1,
                totalItems: 1
            }
        }
    ])
    console.log(result)
}

export const avgDistance = async () => {
    let user = await User.findOne({ name: 'ana' })
    if (!user) return
    const coordinates = user.geo?.coordinates
    const result = await Transaction.aggregate([
        {
            $lookup: {
                from: 'produtos',  
                let: { productId: '$productId' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$productId'] }
                        }
                    },
                    {
                        $geoNear: {
                            near: {
                                type: 'Point',
                                coordinates: [50, 50],
                            },
                            distanceField: 'distance',  
                            spherical: true,  
                            maxDistance: 9000000 
                        }
                    }
                ],
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $addFields: {
                distance: '$productDetails.distance'  
            }
        },
        {
            $group: {
                _id: null,  
                avgDistance: { $avg: '$distance' }  
            }
        }
    ]);
    // {
    //     $lookup: {
    //         from: "produtos",
    //         localField: "productId",
    //         foreignField: "_id",
    //         as: "productDetails"
    //     }
    // },
    // {
    //     $lookup: {
    //         from: "users",
    //         localField: "userId",
    //         foreignField: "_id",
    //         as: "userDetails"
    //     }
    // },
    // {
    //     $unwind: "$productDetails", 
    // },
    // {
    //     $unwind: "$userDetails", 
    // },
    // {
    //     $project: {
    //         buyerLocation: '$userDetails.geo.coordinates', 
    //         sellerLocation: '$productDetails.locVendedor.coordinates' 
    //     }
    // },
    // {
    //     $geoNear: {
    //         near: {
    //             type: 'Point',
    //             coordinates: coordinates 
    //         },
    //         distanceField: 'distance',  
    //         spherical: true,
    //         maxDistance: 5000  
    //     }
    // }
    // ])
    console.log(result)
}

export const vendasPorProduto = async () => {
    const result = await Transaction.aggregate([
        {
            $lookup: {
                from: "produtos", 
                localField: "productId", 
                foreignField: "_id",  
                as: "produto"  
            }
        },
        {
            $unwind: "$produto"
        },
        {
            $group: {
                _id: "$productId",  
                totalVendas: { $sum: "$produto.preco"}, 
                totalProdutosVendidos: { $sum: 1 }  
            }
        },

        {
            $lookup: {
                from: "produtos",  
                localField: "_id",  
                foreignField: "_id",  
                as: "produtoDetalhes" 
            }
        },
        {
            $unwind: "$produtoDetalhes"
        },
        {
            $project: {
                produtoId: "$_id",  
                produtoNome: "$produtoDetalhes.name",  
                totalVendas: 1, 
                totalProdutosVendidos: 1 
            }
        }
    ]);

    console.log("Relatório de Vendas por Produto:", result);
};