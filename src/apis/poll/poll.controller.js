import ErrorProvider from "../../providers/error.provider.js"
import PollServices from "./poll.service.js"

const PollController = {
    async createPoll(req, res, next) {
        try {
            await PollServices.create(req);
            res.status(200).json({
                status: "success",
                message: "Successfully created poll"
            });
        } catch (error) {
            next(ErrorProvider.formatError(error));
        }
    },

    async getAll(req, res, next){
        try {
            const polls = await PollServices.getAll();
            return res.status(200).json({
                status : "success",
                data : {
                    polls,
                    total : polls.length
                },
            })
        }
        catch(error){
            next(ErrorProvider.formatError(error))
        }
    },

    async getOne(req, res, next){
        try {
            const id = req.params.id
            const polls = await PollServices.getOne(id)
            return res.status(200).json({
                status : "success",
                data : polls,
                total : polls.size
            })
        }
        catch(error){
            next(ErrorProvider.formatError(error))
        }
    },

    async delete(req, res, next){
        try {
            const id = req.params.id
            await PollServices.delete(id)

            res.status(200).json({
                status: "success",
                message: "Poll has been successfully deleted."
            });
        }

        catch(error){
            next(ErrorProvider.formatError(error))
        }
    },

    async update(req, res, next){
        try {
            const id = req.params.id
            const data = req.body
            await PollServices.update(id, data)

            res.status(200).json({
                status: "success",
                message: "Poll has been successfully updated."
            });
        }

        catch(error){
            next(ErrorProvider.formatError(error))
        }
    },

    async vote(req, res, next){
        try {
            const { body, user } = req
            const pollID = req.params.id

            await PollServices.vote(body.optionID, pollID, user)

            return res.status(200).json({
                status: "success",
                message: "Your vote has been successfully recorded.",
            });
        }
        catch(error){
            next(ErrorProvider.formatError(error))

        }
    },

    async unvote(req, res, next){
        try {
            const { body, user } = req
            const pollID = req.params.id
            const optionID = body.optionID

            await PollServices.unvote(pollID, optionID, user)
            return res.status(200).json({
                status: "success",
                message: "Your vote has been successfully removed.",
            });
        }
        catch(error){
            next(ErrorProvider.formatError(error))
        }
    },

    async lock(req, res, next){
        try {
            const id = req.params.id
            await PollServices.lock(id, req.user)

            res.status(200).json({
                status: "success",
                message: "Poll has been successfully locked."
            });
        }

        catch(error){
            next(ErrorProvider.formatError(error))
        }
    },

    async unlock(req, res, next){
        try {
            const id = req.params.id
            await PollServices.unlock(id, req.user)

            res.status(200).json({
                status: "success",
                message: "Poll has been successfully unlocked."
            });
        }

        catch(error){
            next(ErrorProvider.formatError(error))
        }
    }

};

export default  PollController