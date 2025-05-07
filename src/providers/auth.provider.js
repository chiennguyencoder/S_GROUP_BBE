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
            html : `
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                    <tr>
                    <td align="center" style="padding: 20px 0;">
                        <h2 style="color: #333;">Reset Your Password</h2>
                    </td>
                    </tr>
                    <tr>
                    <td style="padding: 10px 20px; text-align: center;">
                        <p style="font-size: 16px; color: #555;">We received a request to reset your password. Use the OTP below to proceed:</p>
                        <p style="font-size: 28px; font-weight: bold; color: #000; margin: 20px 0;">${emailText}</p>
                        <p style="font-size: 14px; color: #888;">This code is valid for 10 minutes. If you didn't request a password reset, you can ignore this email.</p>
                    </td>
                    </tr>
                </table>
                </body>
            `
        })
    }
}

export default AuthProvider