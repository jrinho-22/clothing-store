import { Schema } from "../helpers/const"
import mongoose from "mongoose"
import { IProdutoDto, IProdutoUpdateDto } from "../interface/produtoDto";
import { produtoData } from "../database/data/produto";
import { Categoria } from "./categoria";
import { geoSchema } from "./geoJson";
import { User } from "./users";
import { Collection } from "./collection";

const produtoSchema = new Schema<IProdutoDto>({
    name: { type: String, required: true, index: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    quantidadeDisponivel: { type: Number, required: true },
    sex: { type: [String], required: true },
    size: { type: [String], required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', default: null },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', default: null },
    locVendedor: geoSchema,
    img: { type: String, required: true },
    imgDisplay: { type: String, default: null }
});

export const Produto = mongoose.model<IProdutoDto>('Produto', produtoSchema);

export const saveProduto = async (produtoDto: IProdutoDto) => {
    const produto = new Produto(produtoDto);
    await produto.save();
    // console.log("Produto saved:", produto);
};

export const updateProduto = async (productName: string, payload: IProdutoUpdateDto) => {
    let produto = await Produto.findOne({ name: productName })
    if (!produto) return
    await produto.updateOne(payload)
}

export const produtoSeed = async () => {
    for (let data of produtoData) {
        let produto: mongoose.Document | null
        produto = await Produto.findOne({ name: data.name })
        if (produto) continue
        let categoria
        let collection
        if (data.categoria) {
            categoria = await Categoria.findOne({ nome: data.categoria })
        }
        if (data.collection) {
            collection = await Collection.findOne({ nome: data.collection })
        }
        console.log(collection, "colelellele", data)
        produto = new Produto({
            ...data,
            categoria: categoria?._id ? categoria?._id : data.categoria,
            collection: collection?._id ? collection?._id : data.collection
        });
        await produto.save();

    }
}

export const findProductByCategory = async (categoria: String) => {
    try {
        const categoriaObj = await Categoria.findOne({ nome: categoria });
        if (!categoriaObj) {
            throw new Error('Categoria não encontrada');
        }
        const products = await Produto.find({ categoria: categoriaObj._id });
        if (products) {
            console.log(`Produtos encontrados pela categoria ${categoria}: `, products.map((v: any) => v.name));
            return products;
        }
    } catch (error) {
        Promise.reject(error)
    }
}

export const searchNearProducts = async (userName: string) => {
    let user = await User.findOne({ name: userName })
    if (!user) return
    const coordinates = user.geo?.coordinates
    const produtos = await Produto.find({
        "locVendedor.coordinates": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                $maxDistance: 500000
            }
        }
    }).select("name")
    console.log(`Geo search near ${userName}:`, produtos)
}
export const encontrarProdutosGeo = async (point: number[]) => {
    const result = await Produto.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [point[0], point[1]]
                },
                distanceField: "distance",
                spherical: true,
                maxDistance: 50000,
            }
        },
        {
            $group: {
                _id: "$categoria",
                totalProdutos: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "categorias",
                localField: "_id",
                foreignField: "_id",
                as: "categoriaDetalhes"
            }
        },
        {
            $unwind: "$categoriaDetalhes"
        },
        {
            $sort: {
                totalProdutos: -1
            }
        },
        {
            $limit: 1
        },
        {
            $project: {
                categoriaId: "$_id",
                categoriaNome: "$categoriaDetalhes.nome",
                totalProdutos: 1
            }
        }
    ]);

    if (result.length > 0) {
        console.log('Categoria mais popular:', result[0]);
    } else {
        console.log('Nenhum produto encontrado na área geográfica especificada.');
    }
}

// encontrarProdutosGeo([20, 20])