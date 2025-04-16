import { getDatabase } from "../../config/db.config.js";

const getCollection = async () => {
    try {
        return await getDatabase().collection("users");
    } catch (error) {
        throw error;
    }
};

const UserService = {
    async getAllUsers() {
        try {
            const collection = await getCollection();
            const users = await collection.find({}).toArray();
            return users;
        } catch (error) {
            throw error;
        }
    },

    async getUser(id) {
        try {
            const collection = await getCollection();
            const user = await collection.findOne({ _id: Number(id) });
            if (!user) throw new Error('User not found')
            return user;
        } catch (error) {
            throw new Error(`Failed to get user: ${error.message}`);
        }
    },

    async updateUser(id, data) {
        try {
            const collection = await getCollection();
            const query = { _id: Number(id) };
            const update = {
                $set: {
                    ...data
                }
            };
            await collection.updateOne(query, update);
            const updatedUser = await collection.findOne(query);
            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    },

    async postUser(data){
        try {
            const users = await this.getAllUsers();
            const _id = users.length + 1;
            const collection = await getCollection();
            const user = await collection.insertOne({
                _id : _id,
                ...data
            })
            const createdUser = await collection.findOne({_id})
            return createdUser;
        }
        catch(error){
            throw new Error(`Failed to create user: ${error.message}`)
        }
    },

    async deleteUser(id){
        try {
            const collection = await getCollection()
            const res = await collection.deleteOne({_id : Number(id)})
            if (res.deletedCount === 1)
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