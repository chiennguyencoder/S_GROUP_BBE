
import { ObjectId } from "mongodb";
import { getDatabase } from "../config/db.config.js"


const PollModel = {
    async create(data){
        return await getDatabase().collection("polls").insertOne({...data})
    },

    async getAll(){
        return await getDatabase().collection("polls").find({}).toArray()
    },

    async getOne(query){
        return await getDatabase().collection('polls').findOne({...query})
    },

    async delete(query){
        await getDatabase().collection('polls').deleteOne({...query})
    },

    async update(query, data){
        const update = {
            $set : {
                ...data
            }
        }

        await getDatabase().collection('polls').updateOne(query, update)
    },

    async vote(data){
        return await getDatabase().collection("votes").insertOne({...data})
    },

    async findVote(query){
        return await getDatabase().collection("votes").find({...query}).toArray()
    },

    async unvote(query){
        return await getDatabase().collection("votes").deleteOne({...query})
    }
}

export default PollModel