import bcrypt from "bcryptjs"

const HashProvider = {
    async generateHash(plainText){
        const salt = await bcrypt.genSalt(10);
        const hashString = await bcrypt.hash(plainText, salt)
        return hashString;
    },

    async compareHash(plainText, hashString){
        return await bcrypt.compare(plainText, hashString)
    }
}

export default HashProvider