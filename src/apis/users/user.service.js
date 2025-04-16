import { getDatabase } from "../../config/db.config"

const getCollection = async() => {
    return await getDatabase().collection("users")
}

const UserService = {
    async getUserFromDatabase(){
        const users = await getCollection().find({}).toArray();
        return users;
    }
}

export default UserService