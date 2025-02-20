import { Document } from 'mongoose';
import { IGeo } from './IGeoDto';

export interface IUsersDto {
    name: String,        
    email: String,       
    senha: String,        
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
    points?: Number
    geo?: IGeo
}

export type IUserUpdateDto = {
    [key in keyof IUsersDto]?: any;
}