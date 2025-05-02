import { ObjectId } from "mongodb";
import { getDatabase } from "../../config/db.config.js";
import UserModel from "../../models/user.model.js"


const UserService = {
    async getAllUsers() {
        try {
            const users = await UserModel.getAllUser()
            const safeUsers = users.map(({password, ...rest}) => rest)
            return safeUsers
        } catch (error) {
            throw new Error(`Failed to get all user: ${error.message}`);
        }
    },

    async getUser(id) {
        try {
            const user = await UserModel.getUser({_id : new ObjectId(id)})
            if (!user) throw new Error('User not found')
            const {password, ...safeUser} = user
            return safeUser;
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
            const createdUser = await UserModel.postUser(data)
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