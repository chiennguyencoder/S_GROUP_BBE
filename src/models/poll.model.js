
import { ObjectId } from "mongodb";
import { getDatabase } from "../config/db.config.js"


const PollModel = {
    async createPoll(data){
        const poll = await getDatabase().collection("polls").insertOne({...data})
        return poll
    },

    async getAll(data){
        const poll = await getDatabase().collection("polls").find({}).toArray()
        return poll
    }
    
}

export default PollModel