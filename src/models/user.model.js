
import { ObjectId } from "mongodb";
import { getDatabase } from "../config/db.config.js"


const getCollection = async () => {
    try {
        return await getDatabase().collection("users");
    } catch (error) {
        throw error;
    }
};

const UserModel = {
    async getAllUser(){
        const collection = await getCollection()
        const users = await collection.find({}).toArray()
        return users
    },
    async getUser(data){
        const collection = await getCollection()
        const user = await collection.findOne({...data})
        return user
    },
    async updateUser(id,data){
        const collection = await getCollection()
        const query = {_id : new ObjectId(id)}
        const update = {
            $set : {
                ...data
            }
        }
        await collection.updateOne(query, update)
        const user = await collection.findOne(query)
        return user
    },
    async postUser(data){
        const collection = await getCollection();
        const user = await collection.insertOne({
            ...data
        })
        const createdUser = await collection.findOne({_id : user.insertedId})
        return createdUser
    },
    async deleteUser(id){
        const collection = await getCollection()
        const result = await collection.deleteOne({_id : new ObjectId(id)})
        return result
    },
}

export default UserModel