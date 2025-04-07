import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, './data.json')

const FileService = {
    getUsersFromFile(){
        try {
            const data = fs.readFileSync(filePath, 'utf-8')
            return JSON.parse(data)
        }
        catch(error){
            throw new Error(`Read file error: ${error}`)
        }
    },
    saveUsersToFile(users){
        try {
            fs.writeFileSync(filePath, JSON.stringify(users), 'utf-8')
        }
        catch(error) {
            throw new Error(`Write file error: ${error}`)
        }
    }
}

export default FileService