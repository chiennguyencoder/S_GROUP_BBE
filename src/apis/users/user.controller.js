import UserService from "./user.service.js";

const UserController = {
    getAllUser(req, res,next){
        try {
            const users = UserService.getAllUser();
            return res.status(200).json({
                message : "success",
                data : {users}
            })
        }
        catch(err){
            return res.status(500).json({message : err.message || "Internal Server Error"})
        }
    },
}

export default UserController