import express from 'express'
import router from './apis/index.js'
import templateEngineConfig from './config/templateEngine.config.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.use(express.json())
app.use('/', router)

templateEngineConfig(app)

app.get('/hello', (req, res, next) => {
    res.render('index.ejs', {
        name : "Minh Chien",
        age : 19
    })
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))