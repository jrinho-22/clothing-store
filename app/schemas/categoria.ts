import { Schema } from '../helpers/const'
import mongoose from "mongoose"
import { ICategoriaDto } from '../interface/categoriaDto';
import { categoriaData } from '../database/data/categoria';

const categoriaSchema = new Schema<ICategoriaDto>({
  nome: { type: String, required: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', default: null },
  imgId: { type: String, default: null }
});

export const Categoria = mongoose.model<ICategoriaDto>('Categoria', categoriaSchema);

export const saveCategoria = async (categoriaDto: ICategoriaDto) => {
  const categoria = new Categoria(categoriaDto);
  await categoria.save();
  console.log("User saved:", categoria);
};

export const findCatByParent = async (parent: string) => {
  if (!parent) {
    throw new Error('Parent não encontrado');
  }
  return Categoria.find({ parentCategory: parent })
}

export const categoriaSeed = async () => {
  for (let data of categoriaData) {
    let categoria: mongoose.Document | null
    categoria = await Categoria.findOne({ nome: data.nome })
    if (categoria) continue
    if (data.parentCategory) {
      const parentCategory = await Categoria.findOne({ nome: data.parentCategory })
      categoria = new Categoria({
        nome: data.nome,
        parentCategory: parentCategory?._id
      });
    } else {
      categoria = new Categoria(data);
    }
    await categoria.save();
  }
}