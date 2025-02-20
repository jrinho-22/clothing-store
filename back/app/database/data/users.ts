import { IUsersDto } from "../../interface/userDto";

export const userData: IUsersDto[] =
    [
        {
            name: "joao",
            email: "joao@hotmail.com",
            senha: 'joao123',
            endereco: {
                street: 'Rua joao',
                state: "PR",
                city: "Curitiba",
                number: "45"
            },
            cardInformation: [{
                number: "232454546",
                expiration: "12/27",
                security: "123"
            }]
        },
        {
            name: "maria",
            email: "maria@hotmail.com",
            senha: 'maria123',
            endereco: {
                street: 'Rua Maria',
                state: "SP",
                city: "Sao Paulo",
                number: "4"
            },
            cardInformation: [{
                number: "232422546",
                expiration: "09/29",
                security: "123"
            }]
        },
        {
            name: "carlos",
            email: "carlos@hotmail.com",
            senha: 'carlos123',
            endereco: {
                street: 'Rua Carlor',
                state: "SC",
                city: "Blumenau",
                number: "452"
            },
            cardInformation: [{
                number: "232457746",
                expiration: "11/27",
                security: "123"
            }]
        },
        {
            name: "ana",
            email: "ana@hotmail.com",
            senha: 'ana123',
            endereco: {
                street: 'Rua Ana',
                state: "PR",
                city: "Curitiba",
                number: "452"
            },
            cardInformation: [{
                number: "211454546",
                expiration: "02/26",
                security: "123"
            }]
        },
        {
            name: "luiz",
            email: "luiz@hotmail.com",
            senha: 'luiz123',
            endereco: {
                street: 'Rua Luiz',
                state: "PR",
                city: "Curitiba",
                number: "452"
            },
            cardInformation: [{
                number: "232454599",
                expiration: "05/24",
                security: "123"
            }]
        }
    ]