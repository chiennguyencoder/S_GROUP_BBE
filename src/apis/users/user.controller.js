import UserService  from "./user.service.js"

const UserController = {
    getAll(req, res){
        try {
            const data = UserService.getUsersFromFile()
            return res.status(200).json(data.users)
        }   
        catch(error){
            return res.status(500).json({message : error.message})
        }
    },

    getDetail(req, res){
        try {
            const data = UserService.getUsersFromFile()
            const user = data.users.find(u => u.id == Number(req.params.id))

            if (!user) return res.status(404).json({message : "User not found"})

            return res.status(200).json(user)
        }
        catch(error){
            return res.status(500).json({message : error.message})
        }
    },

    createUser(req, res){
        try {
            const data = UserService.getUsersFromFile()
            const user = req.body

            if (!user.name || !user.age) 
                return res.status(400).json({message : 'Missing information'})

            if (data.users.length === 0)
                user.id = 1;
            else 
                user.id = data.users.length + 1;

            data.users.push(user)
            UserService.saveUsersToFile(data)

            return res.status(201).json(data.users)
        }
        catch(error){
            return res.status(500).json({message : error.message})
        }
    },

    updateUser(req, res){
        try {
            const data = UserService.getUsersFromFile()
            const user = req.body
            const index = data.users.findIndex(u => req.params.id == u.id)

            if (user.id != req.params.id)
                return res.status(400).json({message : "Invalid ID"})
            if (index === -1)
                return res.status(404).json({message : "User not found"})

            data.users[index] = {...data.users[index], ...user}
            UserService.saveUsersToFile(data)
            return res.status(200).json(data.users)
        }
        catch (error){
            return res.status(500).json({message : error.message})
        }
    },

    deleteUser(req, res){
        try {
            const data = UserService.getUsersFromFile()
            const userID = Number(req.params.id)
            data.users = data.users.filter(user => user.id != userID)
            UserService.saveUsersToFile(data)
            return res.status(200).json(data.users)
        }
        catch (error){
            return res.status(500).json({message : error.message})
        }
    }
}

export default UserController