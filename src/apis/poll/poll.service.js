import { ObjectId } from "mongodb"
import PollModel from "../../models/poll.model.js"

const PollServices = {
    async create(req) {
        const { body, user } = req;

        const options = body.options.map(option => ({
            _id: new ObjectId(),
            ...option,
        }));

        const pollData = {
            ...body,
            options,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: new ObjectId(user.id),
        };

        return await PollModel.create(pollData);
    },

    async getAll(){
        return await PollModel.getAll()
    },

    async getOne(id) {
        if (!ObjectId.isValid(id)) {
            throw Object.assign(new Error('Invalid Poll ID'), { statusCode: 400 });
        }

        const poll = await PollModel.getOne({ _id: new ObjectId(id) });

        if (!poll || poll.length === 0) {
            throw Object.assign(new Error('Poll not found'), { statusCode: 404 });
        }


        return poll;
    },

    async delete(id){
        if (!ObjectId.isValid(id)) {
            throw Object.assign(new Error('Invalid Poll ID'), { statusCode: 400 });
        }

        await PollModel.delete({_id : new ObjectId(id)})
    },

    async update(id, data){
        if (!ObjectId.isValid(id)) {
            throw Object.assign(new Error('Invalid Poll ID'), { statusCode: 400 });
        }

        await PollModel.update({_id : new ObjectId(id)}, data)
    },

    async vote(optionID, pollID, user) {

        if (!ObjectId.isValid(optionID)) {
            throw Object.assign(new Error('Invalid option ID'), { statusCode: 400 });
        }

        if (!ObjectId.isValid(pollID)) {
            throw Object.assign(new Error('Invalid poll ID'), { statusCode: 400 });
        }

        const poll = await PollModel.getOne({ _id: new ObjectId(pollID) });

        if (!poll || poll.length === 0) {
            throw Object.assign(new Error('Poll not found'), { statusCode: 404 });
        }

        const isVoted = await PollModel.findVote({
            optionID: new ObjectId(optionID),
            pollID: new ObjectId(pollID),
            user: new ObjectId(user.id),
        });

        console.log(isVoted)
        if (isVoted) {
            throw Object.assign(new Error('User has already voted'), { statusCode: 400 });
        }

        await PollModel.vote({
            optionID: new ObjectId(optionID),
            pollID: new ObjectId(pollID),
            createdAt: new Date().toISOString(),
            user: new ObjectId(user.id),
        });
    }
}

export default  PollServices