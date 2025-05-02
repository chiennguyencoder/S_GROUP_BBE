import jwt from 'jsonwebtoken'
import 'dotenv/config'

const AuthProvider = {
    async encodeToken (user){
        return jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_TIME,
                algorithm : 'HS256'
            }
        )
    },

    async decodeToken(token){
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

export default AuthProvider