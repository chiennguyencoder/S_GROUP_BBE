import AuthProvider from "../apis/auth/auth.provider.js"

const VerifyMiddleware = {
    // Middleware to check if user is authenticated
    async checkAuth(req, res, next){
        try {
            const header = req.headers.authorization;
            if (!header){
                throw new Error('Not login')
            }
            const token = header.split(' ')[1];

            req.user = AuthProvider.decodeToken(token);
            next()
        }
        catch(err){
            err.statusCode = 401
            err.message = "Unauthorized or token expired"
            next(err)
        }
    }
}

export default VerifyMiddleware