import AuthProvider from "../../providers/auth.provider.js"
import HashProvider from "../../providers/hash.provider.js"
import { ObjectId } from "mongodb";
import UserModel from "../../models/user.model.js"

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
    },

    async forgotPassword(email) {
        try {
            const user = await UserModel.getUser({ email });
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }

            const token = Math.floor(1000 + Math.random() * 9000);
            await UserModel.updateUser(user._id, {
                token,
                tokenExpireTime: Date.now() + 10 * 60 * 1000,
            });

            await AuthProvider.sendEmail({
                emailFrom: process.env.SMTP_USER,
                emailTo: user.email,
                emailSubject: "Use OTP to reset password",
                emailText: token
            });

            return true;
        } catch (error) {
            throw error;
        }
    },

    async resetPassword(otp, email, newPassword) {
        try {
            const user = await UserModel.getUser({
                token: otp,
                email: email,
                tokenExpireTime: { "$gt": Date.now() }
            });

            if (!user) {
                const error = new Error('Invalid or expired OTP');
                error.statusCode = 400;
                throw error;
            }

            const hashedPassword = await HashProvider.generateHash(newPassword);
            await UserModel.updateUser(user._id, { password: hashedPassword, token: null, tokenExpireTime: null });
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService