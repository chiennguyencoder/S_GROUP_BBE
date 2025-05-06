import jwt from 'jsonwebtoken'
import 'dotenv/config'
import transporter from '../config/email.config.js';

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
    },

    async sendEmail({emailFrom, emailTo, emailSubject, emailText}){
        const info = await transporter.sendMail({
            from : emailFrom,
            to : emailTo,
            subject : emailSubject,
            text: emailText
        })
    }
}

export default AuthProvider