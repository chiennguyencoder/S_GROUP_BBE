import { ObjectId } from "mongodb"
import PollModel from "../../models/poll.model.js"

const PollServices = {
    async createPoll(req){
        const data = req.body

        data.options = data.options.map(option => ({
            _id : new ObjectId(),
            ...option,
        }))

        const fullData = {
            ...data,
            createdAt : new Date(Date.now()).toISOString(),
            updateAt : new Date(Date.now()).toISOString(),
            createdBy : new ObjectId(req.user.id),
        }
        const poll = await PollModel.createPoll(fullData)
        return poll
    },

    async getAll(){
        const poll = await PollModel.getAll()
        return poll
    }
}

export default  PollServices