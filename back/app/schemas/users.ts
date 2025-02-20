import { Schema } from '../helpers/const'
import mongoose from "mongoose"
import { IUsersDto, IUserUpdateDto } from '../interface/userDto';
import { userData } from '../database/data/users';
import { geoSchema } from './geoJson';

const userSchema = new Schema<IUsersDto>({
    name: { type: String, required: true, index: true },
    email: {
        type: String, required: true, unique: true, match: [
            /^\S+@\S+\.\S+$/,
            'email Invalido'
        ]
    },
    senha: { type: String, required: true, minlength: 6 },
    endereco: {
        street: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        number: { type: String },
    },
    cardInformation: [{
        number: { type: String, required: true },
        expiration: { type: String, required: true },
        security: { type: String, required: true },
    }],
    geo: geoSchema,
    points: { type: Number, default: 0 },
});

export const User = mongoose.model<IUsersDto>('User', userSchema, 'users');

export const saveUser = async (usersDto: IUsersDto) => {
    const user = new User(usersDto);
    return await user.save();
};


export const userSeed = async () => {
    try {
        for (let data of userData) {
            let user: any
            user = await User.findOne({ name: data.name })
            if (user) continue
            user = new User(data);
            await user.save();
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (userName: string, payload: IUserUpdateDto) => {
    let user = await User.findOne({ name: userName })
    if (!user) return
    await user.updateOne(payload)
}

export const credentialLookup = async (email: string) => {
    let user = await User.findOne({ email: email })
    if (user) return true
    return false
}

export const passwordCheckLookup = async (email: string, password: string) => {
    let user = await User.findOne({ email: email, senha: password })
    if (user) return user
    return false
}
