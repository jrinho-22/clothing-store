export interface IUsers {
    name: String,        
    email: String,       
    password: String,        
    endereco: {
        street: string
        state: string
        city: string
        number: string
    },
    cardInformation: Array<{
        number: string
        expiration: string
        security: string
    }>,
    _id?: string,
    __v?: string
    points?: Number
}