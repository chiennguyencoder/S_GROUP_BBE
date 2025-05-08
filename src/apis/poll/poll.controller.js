import ErrorProvider from "../../providers/error.provider.js"
import PollServices from "./poll.service.js"

const PollController = {
    async createPoll(req, res, next) {
        try {
            await PollServices.createPoll(req);
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
                data : polls
            })
        }
        catch(error){
            next(ErrorProvider.formatError(error))
        }
    }
};

export default  PollController