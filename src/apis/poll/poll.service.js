import { ObjectId } from "mongodb"
import PollModel from "../../models/poll.model.js"
import UserModel from "../../models/user.model.js"

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
            isLocked : false
        };

        return await PollModel.create(pollData);
    },

    async getAll(){
        const polls =  await PollModel.getAll()

        for (let item of polls){
            const votes = await PollModel.findVote({ pollID : item._id})
            item["votes"] = votes.length
            const createdUser = await UserModel.getUser({ _id : item.createdBy})
            item["createdBy"] = {
                _id : createdUser._id,
                name : createdUser.name,
            }
        }



        return polls
    },

    async getOne(id) {
        
        if (!ObjectId.isValid(id)) {
            throw Object.assign(new Error('Invalid Poll ID'), { statusCode: 400 });
        }

        const poll = await PollModel.getOne({ _id: new ObjectId(id) });

        if (!poll) {
            throw Object.assign(new Error('Poll not found'), { statusCode: 404 });
        }

        for ( let item of poll.options){
            const votes = await PollModel.findVote({ optionID : item._id})
            item["votes"] = votes.length

            if (votes.length !== 0) {
                const userVotes = await UserModel.getUser({ _id : votes[0].user})
                // uservote is array of objects
                item["userVotes"] = votes.map(vote => {
                    return {
                        _id : vote.user,
                        name : userVotes.name,
                    }
                })
            }
        }

        const createdBy = await UserModel.getUser({ _id : poll.createdBy})
        poll["createdBy"] = {
            _id : createdBy._id,
            name : createdBy.name,
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

        if (poll.isLocked){
            throw Object.assign(new Error('Poll is locked'), { statusCode: 400 });
        }

        if (!poll) {
            throw Object.assign(new Error('Poll not found'), { statusCode: 404 });
        }

        const isVoted = await PollModel.findVote({
            optionID: new ObjectId(optionID),
            pollID: new ObjectId(pollID),
            user: new ObjectId(user.id),
        });

        if (isVoted.length !== 0) {
            throw Object.assign(new Error('User has already voted'), { statusCode: 400 });
        }

        if (poll.isLocked){
            throw Object.assign(new Error('Poll is locked'), { statusCode: 400 });
        }

        await PollModel.vote({
            optionID: new ObjectId(optionID),
            pollID: new ObjectId(pollID),
            createdAt: new Date().toISOString(),
            user: new ObjectId(user.id),
        });
    },
    async unvote(pollID, optionID, user) {
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

        if (poll.isLocked){
            throw Object.assign(new Error('Poll is locked'), { statusCode: 400 });
        }



        const votes = await PollModel.unvote({
            optionID: new ObjectId(optionID),
            pollID: new ObjectId(pollID),
            user: new ObjectId(user.id),
        });
        
        if (votes.deletedCount === 0) {
            throw Object.assign(new Error('Vote not found'), { statusCode: 404 });
        }

    },

    async lock(id, user){
        if (!ObjectId.isValid(id)) {
            throw Object.assign(new Error('Invalid Poll ID'), { statusCode: 400 });
        }

        const poll = await PollModel.getOne({ _id: new ObjectId(id) });

        if (!poll) {
            throw Object.assign(new Error('Poll not found'), { statusCode: 404 });
        }

        if (poll.isLocked){
            throw Object.assign(new Error('Poll is already locked'), { statusCode: 400 });
        }

        if (poll.createdBy.toString() !== user.id) {
            throw Object.assign(new Error('You are not the creator of this poll'), { statusCode: 403 });
        }

        await PollModel.update({_id : new ObjectId(id)}, { isLocked : true})
    },

    async unlock(id, user){
        const poll = await PollModel.getOne({ _id: new ObjectId(id) });

        if (!poll) {
            throw Object.assign(new Error('Poll not found'), { statusCode: 404 });
        }

        if (!poll.isLocked){
            throw Object.assign(new Error('Poll is already unlocked'), { statusCode: 400 });
        }

        if (poll.createdBy.toString() !== user.id) {
            throw Object.assign(new Error('You are not the creator of this poll'), { statusCode: 403 });
        }


        await PollModel.update({_id : new ObjectId(id)}, { isLocked : false})
    }
}

export default  PollServices