import { Schema } from '../helpers/const'
import mongoose from "mongoose"
import { IPromocaoDto, IPromocaoSchema } from '../interface/promocaoDto';
import { Produto } from './produto';

const promocaoSchema = new Schema<IPromocaoSchema>({
  desconto: { type: Number, required: true },       
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  dataInicio: {type: Date, required: true, default: new Date()},
  dataFim: {type: Date, required: true},
  pontosNecessarios: {type: Number, default: 0},
});

export const Promocao = mongoose.model<IPromocaoSchema>('Promocao', promocaoSchema, "promocoes");

export const savePromocao = async (promocaoDto: IPromocaoDto) => {
  const produto = await Produto.findOne({ name: promocaoDto.productName })
    const promocao = new Promocao(
      {
        ...promocaoDto,
        productId: produto?._id,
        dataFim: new Date().setDate(new Date().getDate() + promocaoDto.dias)
      }
    );
    await promocao.save(); 
};