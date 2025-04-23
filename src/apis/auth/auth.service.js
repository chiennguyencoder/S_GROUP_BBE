import UserModel from  "./user.model.js"
import AuthProvider from "./auth.provider.js";
import { ObjectId } from "mongodb";

const AuthService = {
    async register(data){
        try {
            const createdUser = await UserModel.postUser(data)
            return createdUser;
        }
        catch(error){
            throw new Error(`Failed to create user: ${error.message}`)
        }
    },

    async login(email, password){
        try {
            const user = await UserModel.getUser({email : email, password : password})
            const token = await AuthProvider.encodeToken(user)
            return token
        }
        catch(error){
            throw new Error(`Failed to login: ${error.message}`)
        }
    },

    async getProfile(id){
        try {
            const user = await UserModel.getUser({_id : new ObjectId(id)});
            if (!user) throw new Error('User not found')
            const {password, ...safe} = user
            return safe
        }
        catch(error){
            throw error
        }
    }
}

export default AuthService