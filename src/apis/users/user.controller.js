import UserService from "./user.service.js";

const UserController = {
  getAllUsers(req, res) {
    try {
      const users = UserService.getAll(req, res);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getDetailUser(req, res) {
    try {
      const user = UserService.getDetailUser(req, res);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  postUser(req, res) {
    try {
      const users = UserService.postUser(req, res);
      return res.status(201).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateUser(req, res) {
    try {
      const user = UserService.updateUser(req, res);
      if (req.body.id != Number(req.params.id))
        return res.status(400).json({ message: "Invalid ID" });

      const data = UserService.updateUser(req, res);
      if (!user) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteUser(req, res) {
    try {
      const users = UserService.deleteUser(req, res);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default UserController;
