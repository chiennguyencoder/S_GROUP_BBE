import UserService from "./user.service.js";

const UserController = {
    async getAllUsers(req, res,next){
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({
                success : true,
                users : users
            })
        }
        catch(err){
            err.statusCode = 500
            err.message = err.message || "initialized server error"
            next(err)
        }
    },
    async updateUser(req, res, next){
        try {
            const data = req.body;
            const id = req.params.id;
            const user = await UserService.updateUser(id, data)
            return res.status(200).json({
                success : true,
                user : user
            })
        }
        catch(err){
            err.statusCode = 500
            err.message = err.message || "Internal server error"
            next(err)
        }
    },
    async getUser(req, res, next){
        try {
            const user = await UserService.getUser(req.params.id)
            return res.status(200).json({
                success : true,
                user : user
            })
        }
        catch(err){
            err.statusCode = 500
            err.message = err.message || "Internal server error"
            next(err)
        }
    },
    async postUser(req, res, next){
        try {
            const user = await UserService.postUser(req.body);
            return res.status(200).json({
                success : true,
                user : user
            })
        }
        catch(err){
            err.statusCode = 500
            err.message = err.message || "Internal server error"
            next(err)
        }
    },
    async deleteUser(req, res, next){
        try {
            const result = await UserService.deleteUser(req.params.id)
            return res.status(200).json({
                success : true,
                message : result
            })
        }
        catch(err){
            err.statusCode = 500
            err.message = err.message || "Internal server error"
            next(err)
        }
    }
}

export default UserController