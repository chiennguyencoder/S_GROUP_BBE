import AuthService from "./auth.service.js"

const AutherController = {
    // Function to handle user registration
    async register(req, res, next){
        try {
            const data = req.body;
            const result = await AuthService.register(data)
            return res.status(200).json({
                success : true,
                message : result
            })
        }
        catch(error){
            error.statusCode = error.statusCode || 500
            error.message = error.message || "Internal Server Error"
            next(error)
        }
    },

    // Function to handle user login
    async login(req, res, next){
        try {
            const { email, password } = req.body
            const token = await AuthService.login(email, password)
            return res.status(200).json({
                succes : true,
                token : token
            })
        }
        catch(err){
            error.statusCode = error.statusCode || 500
            error.message = error.message || "Internal Server Error"
            next(error)
        }
    },

    // Function to handle get user profile
    async getProfile(req, res, next){
        try {
            const id = req.user.id;
            const user = await AuthService.getProfile(id)
            return res.status(200).json({
                status : "success",
                data : {
                    ...user
                }

            })
        }
        catch(err){
            error.statusCode = error.statusCode || 500
            error.message = error.message || "Internal Server Error"
            next(error)
        }
    }
}

export default AutherController;