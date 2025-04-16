import { MongoClient } from 'mongodb'
import 'dotenv/config'

let dbInstance = null;

const client = new MongoClient(process.env.MONGODB_URI)

const connectDatabase = async () => {
    await client.connect();
    dbInstance = client.db(process.env.DB_NAME)
}

const getDatabase = () => {
    if (!dbInstance){
        throw new Error("database not initialized. Call connectDB first");
    }
    return dbInstance
}

export {
    connectDatabase,
    getDatabase
}