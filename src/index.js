const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())

function CRUD(){
    let data;
    const filePath = path.join(__dirname, './data.json')

    // Read file
    function readUserFromFile(){
        try {
            data = JSON.parse(fs.readFileSync(filePath, "utf-8"))

        } catch(error) {
            throw new Error(`Read file error: ${error}`)
        }
    }

    // Write file
    function writeUserToFile(){
        fs.writeFileSync(filePath, JSON.stringify(data), "utf-8", (error) => {
            if (err) throw new Error(`Write file error : ${error}`)
        })
    }

    readUserFromFile()

    // Get all users
    app.get('/users', (req, res) => {
        try {
            readUserFromFile()
            return res.json(data.users);
        }
        catch (error){
            return res.json({message : error.message})
        }
    })

    // Get a user
    app.get("/users/:id", (req, res) => {
        try {
            const userID = Number(req.params.id)
            const user = data.users.find((u) => u.id === userID)
            if (!user) throw new Error("User not found");
            return res.status(200).json(user)
        }
        catch(error){
            return res.status(404).json({message : error.message})
        }
    })

    // Create a user
    app.post("/users", (req, res) => {
        try {
            const user = req.body
            if (!user.name || !user.age)
                return res.status(400).json({message : "Missing information"})

            if (data.users.length == 0) 
                user.id = 1;
            else
                user.id  = data.users[data.users.length - 1].id + 1;
            data.users.push(user)
            writeUserToFile()
            return res.status(201).json(data.users)
        }
        catch (error){
            return res.status(502).json({message : error.message})
        }
    })

    // Delete user
    app.delete("/users/:id", (req, res) => {
        try {
            const userID = Number(req.params.id)
            data.users = data.users.filter(user => user.id != userID)
            writeUserToFile()
            return res.status(200).json(data.users)
        }
        catch (error){
            return res.status(500).json({message : error.message})
        }
    })

    // Update user
    app.put("/users/:id", (req, res) => {
        try {
            const user = req.body
            const index = data.users.findIndex(u => req.params.id == u.id)

            if (user.id != req.params.id)
                return res.status(400).json({message : "Invalid ID"})
            if (index === -1)
                return res.status(404).json({message : "User not found"})

            data.users[index] = {...data.users[index], ...user}
            writeUserToFile()
            return res.status(200).json(data.users)
        }
        catch (error) {
            return res.status(500).json({message : error.message})
        }
    })
}

app.listen(port, () => console.log(`The app listening at http://localhost:${port}`))
CRUD();
