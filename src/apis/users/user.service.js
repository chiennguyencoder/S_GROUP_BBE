import { getDatabase } from "../../config/db.config.js";
import UserModel from "./user.model.js"


const UserService = {
    async getAllUsers() {
        try {
            return await UserModel.getAllUser()
        } catch (error) {
            throw new Error(`Failed to get all user: ${error.message}`);
        }
    },

    async getUser(id) {
        try {
            const user = await UserModel.getUser(id)
            if (!user) throw new Error('User not found')
            return user;
        } catch (error) {
            throw new Error(`Failed to get user: ${error.message}`);
        }
    },

    async updateUser(id, data) {
        try {
            updatedUser = await UserModel.updateUser(id, data)
            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    },

    async postUser(data){
        try {
            const createdUser =await UserModel.postUser(data)
            return createdUser;
        }
        catch(error){
            throw new Error(`Failed to create user: ${error.message}`)
        }
    },

    async deleteUser(id){
        try {
            const result = await UserModel.deleteUser(id)
            if (result.deletedCount === 1)
                return "Successfully deleted user"
            else
                throw new Error("User not found")
        }
        catch(err){
            throw err
        }
    }
};

export default UserService;