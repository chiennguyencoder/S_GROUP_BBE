import AuthProvider from "../../providers/auth.provider.js"
import HashProvider from "../../providers/hash.provider.js"
import { ObjectId } from "mongodb";
import UserModel from "../../models/user.model.js"
import { getDatabase } from "../../config/db.config.js";

const AuthService = {
    async register(data){
        try {
            // Check duplication email
            const { email } = data;
            const existingUser = await UserModel.getUser({email})
            if (existingUser) {
                throw new Error("Email is already in use");
            }
            data.password = await HashProvider.generateHash(data.password)
            const createdUser = await UserModel.postUser(data)
            return createdUser
        }
        catch(error){
            throw error
        }
    },

    async login(email, password){
        try {
            const user = await UserModel.getUser({email : email})
            if (!user) throw new Error('User not found')

            const isPasswordCorrect = await HashProvider.compareHash(password, user.password)

            if (!isPasswordCorrect){
                const err = new Error('Incorrect password')
                err.statusCode = 401
                throw err
            }
            const token = await AuthProvider.encodeToken(user)
            return token
        }
        catch(error){
            error.statusCode = error.statusCode || 500
            error.message = error.message || 'Internal error server'
            throw error
        }
    },

    async getProfile(id){
        try {
            const user = await UserModel.getUser({_id : new ObjectId(id)});
            if (!user) throw new Error('User not found')
            const {password, ...safeUser} = user
            return safeUser
        }
        catch(error){
            throw error
        }
    }
}

export default AuthService