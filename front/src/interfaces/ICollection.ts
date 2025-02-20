export interface ICollection {
    nome: string,
    lancamento: Date,
    expiringDate: Date
    imgId: string
    description: string
    _id: string
}

export interface ICollectionNew extends ICollection{
    new: Boolean
}