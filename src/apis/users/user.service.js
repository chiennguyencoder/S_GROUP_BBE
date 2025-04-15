import FileService  from "../../db/file.js";

const UserController = {
  getAll(req, res) {
    const data = FileService.getUsersFromFile()
    return data.users
  },

  getDetailUser(req, res){
    const data = FileService.getUsersFromFile()
    const user = data.users.find(u => u.id === Number(req.params.id))
    return user
  },

  postUser(req, res){
    const data = FileService.getUsersFromFile()
    const user = req.body
    if (data.users.length === 0)  user.id = 1
    else user.id = data.users.length + 1
    data.users.push(user)
    FileService.saveUsersToFile(data)
    return data.users
  },
  updateUser(req, res){
    const data = FileService.getUsersFromFile()
    const user = req.body
    const index = data.users.findIndex(u => req.params.id == u.id)
    if (index == -1) return false
    data.users[index] = { ...data.users[index], ...user };
    FileService.saveUsersToFile(data);
    return data.users
  },

  deleteUser(req, res){
    const data = FileService.getUsersFromFile()
    data.users = data.users.filter(u => u.id != Number(req.params.id))
    FileService.saveUsersToFile(data)
    return data.users
  }
};

export default UserController;
